//Components
import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartShow, setCartShow] = useState(false);

  const cartShowHandler = () => {
    setCartShow(!cartShow);
  };

  return (
    <Fragment>
      {cartShow && <Cart cartShow={cartShowHandler}></Cart>}
      <Header onShowCart={cartShowHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </Fragment>
  );
}

export default App;
