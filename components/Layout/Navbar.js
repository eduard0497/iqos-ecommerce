import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import { useRouter } from "next/router";
import { FaSearch, FaQuestionCircle, FaEnvelopeOpenText } from "react-icons/fa";
import { homepageLogo } from "../Resources/logos_images";
import { iqosDevices } from "../../products/iqosDevices";
import { heets } from "../../products/heets";
import { accessories } from "../../products/accessories";
import { loadStripe } from "@stripe/stripe-js";
import { updateCart } from "../../generalFunctions/functions";

function Navbar() {
  return (
    <div>
      <NavbarDesktop />
      {/* <NavbarMobile /> */}
    </div>
  );
}

export default Navbar;

const NavbarDesktop = () => {
  return (
    <div className={styles.navbar_desktop_container}>
      <div className={styles.navbar_desktop_upper}>
        <img src={homepageLogo} width="auto" height="38px" />
        <div className={styles.navbar_desktop_upper_search}>
          <FaSearch size="1.3em" color="#ccc" />
          <input type="text" placeholder="Search products..." />
        </div>

        <ul className={styles.navbar_desktop_upper_links}>
          <li>
            <FaQuestionCircle size="1.5em" />
            About us
          </li>
          <li>
            <FaEnvelopeOpenText size="1.5em" />
            Contact us
          </li>
        </ul>
      </div>
      <div className={styles.navbar_desktop_lower}>
        <div className={styles.navbar_desktop_lower_inner}>
          <ul className={styles.navbar_desktop_lower_links}>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/iqos-devices">
                <a>IQOS Devices</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/heets">
                <a>HEETS</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/accessories">
                <a>Accessories</a>
              </Link>
            </li>
          </ul>
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

const NavbarMobile = () => {
  return (
    <div className={styles.navbar_mobile_container}>
      <h1>navbar mobile goes here</h1>
    </div>
  );
};

const CartIcon = () => {
  const [showCart, setShowCart] = useState(false);

  const [cartItemsAmount, setCartItemsAmount] = useState();
  const [cartItemsPrice, setCartItemsPrice] = useState();

  useEffect(() => {
    updateCartIcon();
  }, []);

  const updateCartIcon = () => {
    let cartItemsFromLocalStorage = JSON.parse(
      localStorage.getItem("cartItems")
    );
    if (!cartItemsFromLocalStorage) {
      setCartItemsPrice("0.00");
      setCartItemsAmount(0);
    } else {
      let totalQuantity = 0;
      let totalPrice = 0;
      cartItemsFromLocalStorage.forEach((item) => {
        totalQuantity = totalQuantity + item.quantity;
        totalPrice = totalPrice + item.price * item.quantity;
      });
      setCartItemsPrice(parseFloat(totalPrice).toFixed(2));
      setCartItemsAmount(totalQuantity);
    }
  };

  return (
    <div className={styles.navbar_desktop_lower_cart_context}>
      <span className={styles.navbar_desktop_lower_cart_price}>
        ${cartItemsPrice}
      </span>
      <span
        className={styles.navbar_desktop_lower_cart_logo}
        onClick={() => setShowCart(!showCart)}
      >
        {cartItemsAmount}
      </span>
      <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        updateCartIcon={updateCartIcon}
      />
    </div>
  );
};

const Cart = ({ showCart, setShowCart, updateCartIcon }) => {
  const router = useRouter();
  let allItems = iqosDevices.concat(heets, accessories);
  const [itemsToDisplayInCart, setItemsToDisplayInCart] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cartItemsFromLocalStorage = JSON.parse(
      localStorage.getItem("cartItems")
    );

    if (!cartItemsFromLocalStorage) {
      setItemsToDisplayInCart([]);
    } else {
      for (let i = 0; i < cartItemsFromLocalStorage.length; i++) {
        for (let j = 0; j < allItems.length; j++) {
          if (cartItemsFromLocalStorage[i].productID == allItems[j].productID) {
            cartItemsFromLocalStorage[i].title = allItems[j].title;
            cartItemsFromLocalStorage[i].image = allItems[j].images[0];
            cartItemsFromLocalStorage[i].priceStripeAPI =
              allItems[j].priceStripeAPI;
          }
        }
      }
      setItemsToDisplayInCart(cartItemsFromLocalStorage);
    }
  }, []);

  const changeQuantity = async (id, action) => {
    let updatedItems = itemsToDisplayInCart;
    let foundTheItemIndex = updatedItems.findIndex(
      (item) => item.productID == id
    );
    let itemsToDisplayAfter;
    if (action == "decrement") {
      updatedItems[foundTheItemIndex].quantity =
        updatedItems[foundTheItemIndex].quantity - 1;
      itemsToDisplayAfter = updateCart(updatedItems);
      setItemsToDisplayInCart(itemsToDisplayAfter);
    } else if (action == "increment") {
      updatedItems[foundTheItemIndex].quantity =
        updatedItems[foundTheItemIndex].quantity + 1;
      itemsToDisplayAfter = updateCart(updatedItems);
      setItemsToDisplayInCart(itemsToDisplayAfter);
    }
    updateCartIcon();
  };

  const deleteFromCart = (e) => {
    let cleanedCart = itemsToDisplayInCart.filter(
      (item) => item.productID != e.target.id
    );
    let itemsToDisplayAfter = updateCart(cleanedCart);
    setItemsToDisplayInCart(itemsToDisplayAfter);
    updateCartIcon();
  };

  const checkout = async () => {
    setLoading(true);
    let stripePromise = await loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_API}`
    );
    let itemsToCheckout = [];
    itemsToDisplayInCart.forEach((item) => {
      itemsToCheckout.push({
        price: item.priceStripeAPI,
        quantity: item.quantity,
      });
    });
    let checkoutOptions = {
      lineItems: itemsToCheckout,
      mode: "payment",
      successUrl: `${process.env.NEXT_PUBLIC_WEBSITE_LINK}/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_WEBSITE_LINK}/`,
    };
    const { error } = await stripePromise.redirectToCheckout(checkoutOptions);
    if (error) alert("Error happened at the checkout");
    setLoading(false);
  };

  return (
    <>
      {showCart ? (
        <div className={styles.cart_container}>
          <div className={styles.cart_container_close_button}>
            <h2 onClick={() => setShowCart(false)}>X</h2>
          </div>

          {itemsToDisplayInCart.length != 0 ? (
            <>
              {itemsToDisplayInCart.map((item) => {
                return (
                  <div
                    className={styles.cart_container_row}
                    key={item.productID}
                  >
                    <div className={styles.cart_container_row_image}>
                      <img src={item.image} alt="iqos" />
                    </div>
                    <div>${parseFloat(item.price).toFixed(2)}</div>
                    <div className={styles.cart_container_row_quantity}>
                      <button
                        id={item.productID}
                        onClick={(e) =>
                          changeQuantity(e.target.id, "decrement")
                        }
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        id={item.productID}
                        onClick={(e) =>
                          changeQuantity(e.target.id, "increment")
                        }
                      >
                        +
                      </button>
                    </div>
                    <div>
                      ${parseFloat(item.quantity * item.price).toFixed(2)}
                    </div>
                    <button
                      className={styles.cart_container_row_delete}
                      id={item.productID}
                      onClick={deleteFromCart}
                    >
                      DELETE
                    </button>
                  </div>
                );
              })}
              {loading ? (
                <button className={styles.checkout_button}>Loading...</button>
              ) : (
                <button className={styles.checkout_button} onClick={checkout}>
                  Checkout
                </button>
              )}
            </>
          ) : (
            <h2>Cart is empty...</h2>
          )}
        </div>
      ) : null}
    </>
  );
};
