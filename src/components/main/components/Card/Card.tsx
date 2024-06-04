import {ChevronLeft, ChevronRight, Loader, X} from 'lucide-react';

import './card.scss';
import {ModalProps, ProductReceive} from '../../../../types/types';
import React, {useEffect, useState} from 'react';
import {UseTg} from '../../../../hooks/useTg';
import {addOrderData} from '../../../../hooks/addOrderData';
import {Carousel} from 'react-responsive-carousel';

export const OrderButton = ({amount, brand, model, article, size, disabled}: {
  amount: string | undefined,
  brand: string,
  model: string,
  article: string,
  size: string,
  disabled: boolean,
}) => {
  const {user} = UseTg();

  const handleOrderClick = async () => {
    const newAmount = amount?.replace(/\s+/g, '') ?? '0';
    const data = localStorage.getItem(user?.id.toString());
    // const data = localStorage.getItem('307777256');
    if (!data) {
      console.log('userData is null');
      return null;
    }
    const userData = JSON.parse(data);

    const paymentData = {
      chat_id: userData.chat_id,
      // chat_id: '307777256',
      brand,
      model,
      article,
      amount: newAmount,
      size
    };

    const paymentUrl = await addOrderData(paymentData);

    if (!paymentUrl) {
      console.log('Ошибка запроса');
      return alert('Ошибка запроса');
    }
    window.location.href = paymentUrl;
  };

  return (
    <button style={{display: 'flex', alignItems: 'center'}} disabled={disabled}
            onClick={handleOrderClick}>
      Заказать <ChevronRight />
    </button>
  );

};

const Card = ({closeModal, product}: ModalProps & {
                product: ProductReceive | null,
              }
) => {
  const {user} = UseTg();

  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  useEffect(() => {
    console.log(product);
  }, []);

  if (!product || product.length === 0) {
    return (
      <div className="load">
        <Loader className="animate-spin-slow spinner" size={40} />
      </div>
    );
  }

  return (
    <div className="card">
      <button type="button" onClick={closeModal}>
        <X className="exit" size={30} />
      </button>

      {product.map((item, index) => (
        <div className="card__info" key={index}>
          <Carousel
            className="card__info--carusel"
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showThumbs={false}
          >
            {item.photos.map((photo, photoIndex) => (
              <div key={photoIndex}>
                <img
                  className="card__info--carusel__item"
                  src={`https://stockhub12.ru/uploads/${item.article}/${photo}`}
                  alt={`${item.name} ${item.brand} ${item.article}`}
                />
              </div>
            ))}
          </Carousel>

          <div className="card__info--text">
            <h3 className="card__info--text_title">
              {item.name} {item.brand} {item.model}
            </h3>
            <p className="card__info--text__price">
              {item.price}₽
            </p>
          </div>

          <select className="card__info--sizes" name="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
          >
            <option hidden>Выбери размер</option>
            {item.size?.map((size, sizeIndex) => (
              <option key={sizeIndex} value={size}>
                {size} us
              </option>
            ))}
          </select>

          {user?.id ? (

            <div className={'card__info--btns'}>
              <a className="card__info--btns_basket" href="/">
                <ChevronLeft />В корзину
              </a>

              {!selectedSize ? (
                <>
                  <p className={'card__info--btns_order'}>Выбери размер</p>
                </>
              ) : (
                <div className={'card__info--btns_order'}>
                  <OrderButton amount={item.price?.toString()} brand={item.brand}
                               model={item.model} article={item.article} size={selectedSize}
                               disabled={!selectedSize} />
                </div>

              )}
            </div>

          ) : (
            <>
              <p style={{color: 'red'}}>Для заказа используй мобильную версию Telegram</p>
            </>
          )}

          <div className="card__info__subtitle">
            {item.name} {item.model} {item.brand}. Основа пары
            - {item.material}. Цвет модели: {item.color?.map(item => item)}.
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
