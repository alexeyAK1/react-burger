import React, { FC } from "react";
import { IIngredientImage } from "../../../models/ingredients";
import RoundPicture from "../round-picture/round-picture";
import styles from "./row-round-pictures.module.css";

interface IProps {
  images: IIngredientImage[];
}

const maxIndex = 6;

const RowRoundPictures: FC<IProps> = ({ images }) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.images_container}>
        {[...images].reverse().map((image, index) =>
          index < maxIndex ? (
            <div key={index} className={styles.image_container}>
              <RoundPicture image={image} />
            </div>
          ) : null
        )}
      </div>

      {images.length >= maxIndex ? (
        <div className={`text text_type_main-default ${styles.another}`}>
          <p>{`+${images.length - maxIndex}`}</p>
        </div>
      ) : null}
    </div>
  );
};

export default RowRoundPictures;
