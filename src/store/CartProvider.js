import { useReducer } from "react";
import CartContext from "./cart-context";

// set deafult values of the cart
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// craete the reducer function to handle actions
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item); // conact return a new array
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // returns a new state of the cart
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // return default state if none action type are matched
  return defaultCartState;
};

const CartProvider = (props) => {
  // use reducer to initiate the cart initail valye and dispatch function
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //function to add item in cart
  const adItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD", //action name
      item: item, //action value to store
    });
  };

  //function to remove item from cart using its id
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  //cart context
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: adItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
