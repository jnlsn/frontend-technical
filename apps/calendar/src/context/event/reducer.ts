import { Event, EventActions, EventState } from "./types";

let eventId = 0;

export const eventReducer = (
  state: EventState,
  action: EventActions
): EventState => {
  switch (action.type) {
    case "CREATE": {
      eventId++;
      const { startHour } = action.payload;
      const event: Event = {
        id: eventId.toString(),
        title: "",
        startHour,
        endHour: startHour + 1,
      };
      return { ...state, events: [...state.events, event], editing: event.id };
    }
    case "EDIT": {
      return { ...state, editing: action.payload.id };
    }
    case "UPDATE": {
      return {
        ...state,
        editing: null,
        events: [
          ...state.events.filter((event) => event.id !== action.payload.id),
          action.payload,
        ],
      };
    }
    case "CANCEL": {
      const editingEvent = state.events.find(
        (event) => event.id === state.editing
      );
      const events = editingEvent?.title
        ? state.events
        : state.events.filter((event) => event.id !== state.editing);
      return { ...state, events, editing: null };
    }
    default:
      throw new Error("Invalid event action dispatched");
  }
};
