import React, { FC } from "react";
import styles from "./statistics.module.css";

interface IProps {
  ready: string[];
  inTheWork: string[];
  completedForAllTime: number;
  completedToday: number;
}

const Statistics: FC<IProps> = ({
  ready,
  inTheWork,
  completedForAllTime,
  completedToday,
}) => {
  return (
    <section className={styles.main_container}>
      <div className={styles.status_table}>
        <div className={styles.ready}>
          <h3 className="text text_type_main-medium">Готовы:</h3>
          <ul>
            {ready.map((item) => (
              <li key={item} className="text text_type_digits-default">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.in_work}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <ul>
            {inTheWork.map((item) => (
              <li key={item} className="text text_type_digits-default">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.completed_block}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p>
          <span className="text text_type_digits-large">
            {completedForAllTime.toLocaleString()}
          </span>
        </p>
      </div>
      <div className={styles.completed_block}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p>
          <span className="text text_type_digits-large">
            {completedToday.toLocaleString()}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Statistics;
