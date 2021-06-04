import { useReducer } from "react";
import CartContext from "./cart-context";

// set deafult values of the cart
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// craete the reducer function to handle actions
//state always return the last state of the cart which is updated
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //update the total amount in the cart
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //check for same item using item id
    // return the index postion of item if found
    const sameItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // get the item from the cart
    const existingCartItem = state.items[sameItemIndex];

    let updatedItems;

    // if the same item exists
    // update the amount of the item
    if (existingCartItem) {
      // create a new item array of the same item with the updated amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      // create a new array of the items array
      updatedItems = [...state.items];

      //update the existing item array with new created array
      updatedItems[sameItemIndex] = updatedItem;
    } else {
      // else concat the item in the item array and create a new array
      updatedItems = state.items.concat(action.item);
    }

    // returns a new state of the cart
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    //check for existing item with same id
    const sameItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // get the item from the cart
    const existingCartItem = state.items[sameItemIndex];

    let updatedItems;

    //decrease the total amount of cart
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      // create a new array of the items array
      updatedItems = [...state.items];

      //update the existing item array with new created array
      updatedItems[sameItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
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

  //function to clear cart items
  const clearCartHandler = () => {
    dispatchCartAction({
      type: "CLEAR",
    });
  };

  //cart context
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: adItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
