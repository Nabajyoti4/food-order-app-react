import React from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

function Cart(props) {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[
        {
          id: "m1",
          name: "Sushi",
          description: "Finest fish and veggies",
          price: 22.99,
        },
      ].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.cartShow}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>556.66</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.cartShow} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
