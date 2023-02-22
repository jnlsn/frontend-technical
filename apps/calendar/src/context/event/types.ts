export interface Event {
  startHour: number;
  endHour: number;
  id: string;
  title: string;
}

export type EventState = {
  events: Event[];
  editing: string | null;
};

export type EventActions =
  | { type: "CREATE"; payload: { startHour: number } }
  | { type: "UPDATE"; payload: Event }
  | { type: "EDIT"; payload: { id: string } }
  | { type: "CANCEL" };
