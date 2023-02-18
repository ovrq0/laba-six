import React from "react";
import { useNavigate } from "react-router";

const Order= ({ orders }) => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="page__inner">
        <button onClick={() => navigate(-1)} className="back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <p>Назад</p>
        </button>
        <h1>Заказы</h1>
        {orders.map((order, index) => {
          return (
            <div className="order">
              <h3>Заказ #{index + 1}</h3>
              <div className="order__content">
                {order.map((item) => {
                  return (
                    <div className="order__item">
                      <h4>{item.item.name}</h4>
                      <p>Кол-во: {item.quantity}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
