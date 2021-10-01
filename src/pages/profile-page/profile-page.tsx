import { motion } from "framer-motion";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { variantsProfileButton } from "../../components/forms/common/animations-form";
import { useDispatch } from "../../components/hooks";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import { ORDERS_PATH, PROFILE_PATH } from "../../routes/constants-path";
import ProfilePageRoutes from "../../routes/profile-page-routes";
import { getLogoutFetch } from "../../services/user-slice";
import styles from "./profile-page.module.css";

const ORDER_HISTORY_PATH = PROFILE_PATH + ORDERS_PATH;

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
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

          <li className="text text_type_main-default">
            <p>
              <span>
                В этом разделе вы можете
                <br /> изменить свои персональные данные
              </span>
            </p>
          </li>
        </ul>
        <ProfilePageRoutes />
      </section>
    </MainAllLayouts>
  );
}
