import React, { FC } from "react";
import { IIngredientsItem } from "../../../models/ingredients";
import styles from "./round-picture.module.css";

interface IProps {
  image: IIngredientsItem;
}

const RoundPicture: FC<IProps> = ({ image }) => {
  return (
    <img alt={image.name} src={image.image_mobile} className={styles.image} />
  );
};

export default RoundPicture;
