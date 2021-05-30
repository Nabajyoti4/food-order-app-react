import React, { Fragment } from "react";
import classes from "./Header.module.css";
import meals from "../../assets/meals.jpg";

function Header() {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="Table of meals"></img>
      </div>
    </Fragment>
  );
}

export default Header;
