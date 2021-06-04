import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";

//compoennt
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  // format the price to a small value
  const price = `$${cartCtx.totalAmount.toFixed(2)}`;

  //add item from the cart
  const addItemToCartHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const removeItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(!isCheckout);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemFromCartHandler.bind(null, item.id)}
          onAdd={addItemToCartHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.cartShow}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{price}</span>
      </div>
      {isCheckout && <Checkout onCancel={orderHandler}></Checkout>}
      {!isCheckout && (
        <div className={classes.actions}>
          <button onClick={props.cartShow} className={classes["button--alt"]}>
            Close
          </button>
          {cartCtx.items.length > 0 && (
            <button onClick={orderHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}

export default Cart;
