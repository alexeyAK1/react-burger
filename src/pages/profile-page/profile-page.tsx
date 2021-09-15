import React from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import styles from "./profile-page.module.css";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import { ProfileForm } from "../../components/forms";

const MAIN_PATH = "/profile";
const ORDER_HISTORY_PATH = MAIN_PATH + "/order-history";

export default function ProfilePage() {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <MainAllLayouts>
      <section className={styles.profile_page_container}>
        <ul className={styles.profile_page_container_menu}>
          <li className="text text_type_main-medium">
            <Link
              to={MAIN_PATH}
              className={`${styles.menu_link} ${
                pathname === MAIN_PATH ? styles.active : ""
              }`}
            >
              Профиль
            </Link>
          </li>
          <li className="text text_type_main-medium">
            <Link
              to={ORDER_HISTORY_PATH}
              className={`${styles.menu_link} ${
                pathname === ORDER_HISTORY_PATH ? styles.active : ""
              }`}
            >
              История заказов
            </Link>
          </li>
          <li className="text text_type_main-medium">
            <Link to={`#`} className={styles.menu_link}>
              Выход
            </Link>
          </li>
          {pathname === MAIN_PATH ? (
            <li className="text text_type_main-default">
              <p>
                <span>
                  В этом разделе вы можете
                  <br /> изменить свои персональные данные
                </span>
              </p>
            </li>
          ) : null}
        </ul>

        <div className={styles.profile_page_container_content}>
          <Switch>
            <Route exact path={path}>
              <ProfileForm />
            </Route>
            <Route path={`${path}/order-history`}>
              <div>111</div>
            </Route>
          </Switch>
        </div>
      </section>
    </MainAllLayouts>
  );
}
