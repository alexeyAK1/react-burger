import React, {
  useEffect,
  useState,
  MouseEvent,
  useCallback,
  memo,
} from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import ScrollContainer from '../../layouts/ScrollContainer/ScrollContainer';
import IngredientItem from './IngredientItem/IngredientItem';
import { IIngredientsItem } from '../../models/ingredients';
import Modal from '../common/Modal/Modal';
import { IOrder } from '../../models/order';
import OrderDetails from '../OrderDetails/OrderDetails';

function BurgerConstructor() {
  const [bun, setBun] = useState<IIngredientsItem | null>(null);
  const [ingredients, setIngredients] = useState<IIngredientsItem[]>([]);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onCloseModal = useCallback((e?: MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation();
    }

    setIsOpenModal(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  useEffect(() => {
    setOrder({
      _id: '034536',
      status: 'check',
      status_text: 'Ваш заказ начали готовить',
    });
    setBun({
      _id: '60666c42cc7b410027a1a9b1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    });

    setIngredients([
      {
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9b6',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9b7',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9b4',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9c1',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9c2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9c3',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
      },
      {
        _id: '60666c42cc7b410027a1a9c4cs',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0,
      },
    ]);

    return () => {};
  }, []);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.burger_constructor_body}>
        <div className={styles.burger_top}>
          {bun ? (
            <IngredientItem
              isTop={true}
              price={bun.price}
              name={bun.name}
              image={bun.image_mobile}
            />
          ) : null}
        </div>
        <div className={styles.burger_list_container}>
          <ScrollContainer className={styles.burger_list_scroll}>
            <>
              {ingredients.map((ingredient) => (
                <IngredientItem
                  price={ingredient.price}
                  name={ingredient.name}
                  image={ingredient.image_mobile}
                  key={ingredient._id}
                />
              ))}
            </>
          </ScrollContainer>
        </div>
        <div className={styles.burger_bottom}>
          {bun ? (
            <IngredientItem
              isBottom={true}
              price={bun.price}
              name={bun.name}
              image={bun.image_mobile}
            />
          ) : null}
        </div>
      </div>
      <div className={`pt-10 pb-10 ${styles.burger_constructor_footer}`}>
        <p className={`pr-10 ${styles.total_container}`}>
          <span className="text text_type_digits-medium">610</span>
          <span className={styles.total_icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button type="primary" size="large" onClick={onOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {isOpenModal && order ? (
        <Modal onClose={onCloseModal}>
          <OrderDetails order={order} />
        </Modal>
      ) : null}
    </section>
  );
}

export default memo(BurgerConstructor);
