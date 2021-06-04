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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

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

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(
        "https://food-order-react-app-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            order: cartCtx.items,
          }),
        }
      );
    } catch (err) {}

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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

  const cartModal = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{price}</span>
      </div>
      {isCheckout && (
        <Checkout
          setOrderHandler={submitOrderHandler}
          onCancel={orderHandler}
        ></Checkout>
      )}
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
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending your order</p>;

  const didSubmitOrder = <p>Succesfully ordered your Meal</p>;

  return (
    <Modal onClose={props.cartShow}>
      {!isSubmitting && !didSubmit && cartModal}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitOrder}
    </Modal>
  );
}

export default Cart;
