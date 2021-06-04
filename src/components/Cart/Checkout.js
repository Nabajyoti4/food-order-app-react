import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//helper validation functions
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValid, setFormValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  // refrenxe for all form inputs
  const nameInput = useRef("");
  const streetInput = useRef("");
  const postalInput = useRef("");
  const cityInput = useRef("");

  const confirmHandler = (event) => {
    event.preventDefault();

    //get all fields data
    const name = nameInput.current.value;
    const street = streetInput.current.value;
    const postal = postalInput.current.value;
    const city = cityInput.current.value;

    //check validation of all fields
    const nameValid = !isEmpty(name);
    const streetValid = !isEmpty(street);
    const postalValid = isFiveChars(postal);
    const cityValid = !isEmpty(city);

    setFormValid({
      name: nameValid,
      street: streetValid,
      postal: postalValid,
      city: cityValid,
    });

    const formIsValid = nameValid && streetValid && postalValid && cityValid;

    if (!formIsValid) {
      return;
    }

    props.setOrderHandler({
      name: name,
      street: street,
      postal: postal,
      city: city,
    });

    //submit
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInput} type="text" id="name" />
        {!formValid.name && <p>Enter valid name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {!formValid.street && <p>Enter valid street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInput} type="text" id="postal" />
        {!formValid.postal && <p>Enter valid Postal of 5 charatrers</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {!formValid.city && <p>Enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
