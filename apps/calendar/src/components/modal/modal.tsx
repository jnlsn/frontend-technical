import * as React from "react";
import { Event, EventContext, EventState } from "../../context/event";
import { formatTime } from "../../utils/formatTime";
import styles from "./modal.module.css";

export const Modal = (): JSX.Element => {
  const titleRef = React.useRef<null | HTMLInputElement>(null);
  const [formState, setFormState] = React.useState<Partial<Event> | undefined>({
    title: "",
    startHour: 0,
    endHour: 1,
  });
  const { state, dispatch } = React.useContext(EventContext);
  const titleId = React.useId();
  const startId = React.useId();
  const startTimes = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: formatTime(i),
  }));
  const endTimes = [...startTimes, { value: 24, label: formatTime(24) }];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    const updated = { ...formState };
    switch (name) {
      case "title":
        updated.title = value;
        break;
      case "startHour": {
        updated.startHour = Number(value);
        if (updated.startHour >= (updated?.endHour || -1)) {
          updated.endHour = updated.startHour + 1;
        }
        break;
      }
      case "endHour": {
        updated.endHour = Number(value);
      }
    }
    setFormState(updated);
  };

  const handleSubmit = () => {
    if (
      formState?.title &&
      formState.endHour &&
      formState.startHour !== undefined &&
      formState.id
    ) {
      dispatch({
        type: "UPDATE",
        payload: {
          id: formState.id,
          endHour: formState.endHour,
          startHour: formState.startHour,
          title: formState.title,
        },
      });
    }
  };

  const handleCancel = () => {
    dispatch({ type: "CANCEL" });
  };

  React.useEffect(() => {
    if (state.editing && titleRef.current) {
      const event = state.events.find((event) => event.id === state.editing);
      setFormState(event ? { ...event } : undefined);
      titleRef.current.focus();
    }
  }, [state.editing]);

  return (
    <div className={styles.modalScreen} hidden={!state.editing}>
      <div className={styles.modal}>
        <div className={styles.field}>
          <label htmlFor={titleId}>Event Name:</label>
          <input
            onChange={handleInputChange}
            value={formState?.title}
            ref={titleRef}
            name="title"
            required
            id={titleId}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={startId}>Start Time</label>
          <select
            onChange={handleInputChange}
            value={formState?.startHour}
            required
            name="startHour"
          >
            {startTimes.map((time) => (
              <option key={`start-time-opt-${time.value}`} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor={startId}>End Time</label>
          <select
            onChange={handleInputChange}
            value={formState?.endHour}
            required
            name="endHour"
          >
            {endTimes.map((time) => (
              <option
                disabled={time.value <= (formState?.startHour || -1)}
                key={`end-time-opt-${time.value}`}
                value={time.value}
              >
                {time.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleCancel}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!formState?.title}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
