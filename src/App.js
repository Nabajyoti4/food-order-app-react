//Components
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShow, setCartShow] = useState(false);

  const cartShowHandler = () => {
    setCartShow(!cartShow);
  };

  return (
    <CartProvider>
      {cartShow && <Cart cartShow={cartShowHandler}></Cart>}
      <Header onShowCart={cartShowHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
