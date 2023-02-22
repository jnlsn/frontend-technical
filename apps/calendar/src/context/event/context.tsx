import React, { createContext, Dispatch, useReducer } from "react";
import { eventReducer } from "./reducer";
import { EventActions, EventState } from "./types";

export const initialEventState: EventState = {
  events: [],
  editing: null,
};

export const EventContext = createContext<{
  state: EventState;
  dispatch: Dispatch<EventActions>;
}>({
  state: initialEventState,
  dispatch: () => void 0,
});

export interface EventProviderProps {
  children: React.ReactNode;
}

export const EventProvider = ({
  children,
}: EventProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(eventReducer, initialEventState);
  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
