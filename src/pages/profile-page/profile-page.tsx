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
import { getLogoutFetch } from "../../services/user-slice";
import { useDispatch } from "react-redux";
import { ORDERS_PATH, PROFILE_PATH } from "../../routes/constants-path";

const ORDER_HISTORY_PATH = PROFILE_PATH + ORDERS_PATH;

export default function ProfilePage() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  // const refreshToken = useSelector((state: RootState) => state.user.refreshToken);
  const handleOnClickLogOut = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    dispatch(getLogoutFetch());
  };

  return (
    <MainAllLayouts>
      <section className={styles.profile_page_container}>
        <ul className={styles.profile_page_container_menu}>
          <li className="text text_type_main-medium">
            <Link
              to={PROFILE_PATH}
              className={`${styles.menu_link} ${
                pathname === PROFILE_PATH ? styles.active : ""
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
            <Link
              to={`#`}
              className={styles.menu_link}
              onClick={handleOnClickLogOut}
            >
              Выход
            </Link>
          </li>
          {pathname === PROFILE_PATH ? (
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
            <Route path={`${path}${ORDERS_PATH}`}>
              <div>ORDER_PATH</div>
            </Route>
          </Switch>
        </div>
      </section>
    </MainAllLayouts>
  );
}
