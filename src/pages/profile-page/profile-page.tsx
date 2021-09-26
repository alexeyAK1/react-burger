import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import {
    Link,
    Route,
    Switch,
    useLocation,
    useRouteMatch
} from "react-router-dom";
import { ProfileForm } from "../../components/forms";
import {
    variantsNextRouter,
    variantsProfileButton
} from "../../components/forms/common/animations-form";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import { ORDERS_PATH, PROFILE_PATH } from "../../routes/constants-path";
import { getLogoutFetch } from "../../services/user-slice";
import styles from "./profile-page.module.css";


const ORDER_HISTORY_PATH = PROFILE_PATH + ORDERS_PATH;

export default function ProfilePage() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const location = useLocation();
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
          <motion.li
            className="text text_type_main-medium"
            variants={variantsProfileButton}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Link
              to={PROFILE_PATH}
              className={`${styles.menu_link} ${
                pathname === PROFILE_PATH ? styles.active : ""
              }`}
            >
              Профиль
            </Link>
          </motion.li>
          <motion.li
            className="text text_type_main-medium"
            variants={variantsProfileButton}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Link
              to={ORDER_HISTORY_PATH}
              className={`${styles.menu_link} ${
                pathname === ORDER_HISTORY_PATH ? styles.active : ""
              }`}
            >
              История заказов
            </Link>
          </motion.li>
          <motion.li
            className="text text_type_main-medium"
            variants={variantsProfileButton}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Link
              to={`#`}
              className={styles.menu_link}
              onClick={handleOnClickLogOut}
            >
              Выход
            </Link>
          </motion.li>
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
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path={path}>
                <ProfileForm />
              </Route>
              <Route path={`${path}${ORDERS_PATH}`}>
                <motion.div
                  variants={variantsNextRouter}
                  initial="hidden"
                  exit="exit"
                  animate="visible"
                >
                  ORDER_PATH
                </motion.div>
              </Route>
            </Switch>
          </AnimatePresence>
        </div>
      </section>
    </MainAllLayouts>
  );
}
