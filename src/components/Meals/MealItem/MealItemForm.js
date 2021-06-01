import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [error, setError] = useState(false);
  const amountInputRef = useRef();

  const setErrorHandler = () => {
    setError(true);
  };

  // handler to add item in cart
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value; // get amount using ref
    const enteredAmountNumber = +enteredAmount; // convert string to num with + sign

    // validation to check the value of entered amount
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setErrorHandler();
      return;
    }

    // call a function from parent to add item
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button onClick={onSubmitHandler}>+ Add</button>
      {error && <p>Enter amount in range of 1-5</p>}
    </form>
  );
}

export default MealItemForm;
