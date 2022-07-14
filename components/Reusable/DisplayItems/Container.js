import React from "react";
import styles from "../../../styles/Reusable/DisplayItems/Container.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

function Container({ itemsToDisplay }) {
  const router = useRouter();

  const addToCart = (e) => {
    if (!localStorage.getItem("cartItems")) {
      let arrayToAdd = [];
      let objectToCreate = {
        productID: e.target.id,
        price: parseFloat(e.target.value),
        quantity: 1,
      };
      arrayToAdd.push(objectToCreate);
      localStorage.setItem("cartItems", JSON.stringify(arrayToAdd));
      router.reload(window.location.pathname);
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      let foundTheItemIndex = cartItems.findIndex(
        (item) => item.productID == e.target.id
      );
      if (foundTheItemIndex < 0) {
        let objectToAdd = {
          productID: e.target.id,
          price: parseFloat(e.target.value),
          quantity: 1,
        };
        cartItems.push(objectToAdd);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        router.reload(window.location.pathname);
      } else {
        cartItems[foundTheItemIndex].quantity =
          cartItems[foundTheItemIndex].quantity + 1;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        router.reload(window.location.pathname);
      }
    }
  };

  return (
    <div className={styles.display_items_container}>
      {itemsToDisplay.map((item) => {
        return (
          <div
            key={item.productID}
            className={styles.display_items_container_item}
          >
            <Link href="/">
              <a>
                <img src={item.images[0]} alt="iqos" />
              </a>
            </Link>

            <div>
              <p>{item.category}</p>
              <div className={styles.display_items_container_item_title}>
                {item.title}
              </div>
              <div>{item.price}</div>
              <button
                id={item.productID}
                value={item.price.replace("$", "")}
                onClick={addToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Container;
