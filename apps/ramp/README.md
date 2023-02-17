# Calendar App

Implement a clone of Google Calendar’s day view that allows creating, deleting, and editing events via modal/popup.

Specifications:

1. Show date for the day at the top, as well as 24 1-hour blocks in one column. Labels for hours should be displayed on the left beside each block.
2. Events are rectangles that span one or multiple blocks.

- Assume event start/end times are EXACTLY on the hour (eg. 2pm-5pm, but don’t need to handle 2:03pm-5:07pm).

3. Create new events by clicking an empty cell block, which opens a modal. The modal has 3 inputs (start time, end time, name). Saving creates the event.

- The start time input’s default value is populated by the hour corresponding to which empty cell you clicked on.

4. Clicking an existing event should bring up a modal to edit event details (start time, end time, and name only)

- The start/end/name inputs is default populated by the event’s current details.
- On save button click, modal closes + cal updates
- Has a button to delete the event also.

5. How to handle/display overlapping time events: any way is fine, but should not allow an event to entirely cover another.

- For example, if multiple events have the exact same start and end time, they should all be at least partially visible+clickable.
