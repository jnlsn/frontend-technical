import * as React from "react";
import { EventProvider } from "../../context/event";
import { Heading } from "../heading";
import { Hour } from "../hour";
import { Modal } from "../modal";
import styles from "./calendar.module.css";

export const Calendar = (): JSX.Element => {
  const today = new Date();
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return (
    <EventProvider>
      <div className={styles.calendar}>
        <Heading>
          {today.toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Heading>
        <div className={styles.day}>
          {hours.map((hour) => (
            <Hour key={`hour-${hour}`} hour={hour} today={today} />
          ))}
        </div>
      </div>
      <Modal />
    </EventProvider>
  );
};
