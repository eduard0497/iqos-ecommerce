import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { iqosDevices } from "../../products/iqosDevices";
import Container from "../Reusable/DisplayItems/Container";

function PopularProducts() {
  return (
    <div className={styles.popular_items_container}>
      <h3>
        Our <span>most</span> pupular products
      </h3>
      <Container itemsToDisplay={iqosDevices} />
    </div>
  );
}

export default PopularProducts;
