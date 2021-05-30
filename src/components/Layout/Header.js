import React, { Fragment } from "react";
import classes from "./Header.module.css";
import meals from "../../assets/meals.jpg";

//Componets
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton showCart={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="Table of meals"></img>
      </div>
    </Fragment>
  );
}

export default Header;
