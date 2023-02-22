import * as React from "react";
import styles from "./heading.module.css";

export interface HeadingProps {
  children: React.ReactNode;
}

export const Heading = ({ children }: HeadingProps): JSX.Element => {
  return <h1 className={styles.heading}>{children}</h1>;
};
