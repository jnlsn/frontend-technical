import * as React from "react";
import { EventContext } from "../../context/event";
import styles from "./hour.module.css";

export interface HourProps {
  hour: number;
  today: Date;
}

export const Hour = ({ hour, today }: HourProps): JSX.Element => {
  const { dispatch, state } = React.useContext(EventContext);
  const event = state.events.find((event) => event.startHour === hour);
  const isCovered = state.events.some(
    (event) => event.startHour <= hour && event.endHour > hour
  );
  const time = new Date(today.setHours(hour, 0, 0)).toLocaleTimeString(
    undefined,
    {
      timeStyle: "short",
    }
  );
  return (
    <div className={styles.hour} key={`hour-${hour}`}>
      <div>
        <span className={styles.hourLabel}>{time}</span>
      </div>
      <div>
        {event ? (
          <button
            className={styles.event}
            aria-label={`edit ${event.title}`}
            style={
              {
                ["--hours"]: event.endHour - event.startHour,
              } as React.CSSProperties
            }
            onClick={() =>
              dispatch({ type: "EDIT", payload: { id: event.id } })
            }
          >
            {event.title || "[Untitled]"}
          </button>
        ) : (
          <button
            disabled={isCovered}
            className={styles.createEvent}
            aria-label={`Add new event starting at ${time}`}
            onClick={() =>
              dispatch({ type: "CREATE", payload: { startHour: hour } })
            }
          ></button>
        )}
      </div>
    </div>
  );
};
