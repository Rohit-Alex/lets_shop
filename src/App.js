import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "react-spinkit";
const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [render, setRender] = useState(true);
  const [user, loading] = useAuthState(auth);

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      setProducts(data);
    };

    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
    };
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>loading... Please Wait</h1>
        <br />
        <br />
        <br />
        <br />
        <div>
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </div>
      </div>
    );
  }
  if (!user && render) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login setRender={setRender} />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Redirect>
            <Login setRender={setRender} />
          </Redirect>
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <CssBaseline />
          <Navbar
            totalItems={cart.total_items}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Switch>
            <Route exact path="/">
              <Products
                products={products}
                onAddToCart={handleAddToCart}
                handleUpdateCartQty
              />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
                onEmptyCart={handleEmptyCart}
              />
            </Route>
            <Route path="/checkout" exact>
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
