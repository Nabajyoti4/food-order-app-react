import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";

//Componet
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const [btnAnimation, setBtnAnimation] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={props.showCart} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
