import React from "react";
import classes from "./HeaderCartButton.module.css";

//Componet
import CartIcon from "../Cart/CartIcon";

function HeaderCartButton(props) {
  return (
    <button onClick={props.showCart} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
}

export default HeaderCartButton;
