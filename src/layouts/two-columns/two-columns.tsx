import React from "react";
import styles from "./two-columns.module.css";


interface IProps {
  children: React.ReactChild;
  style?: React.CSSProperties;
  className?: string;
}

export default function TwoColumns({ children, style, className }: IProps) {
  return (
    <div
      className={`${styles.two_columns} ${className ? className : ""}`}
      style={style ? style : {}}
    >
      {children}
    </div>
  );
}
