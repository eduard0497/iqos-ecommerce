import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Categories.module.css";
import Container from "../../components/Reusable/DisplayItems/Container";
import { iqosDevices } from "../../products/iqosDevices";
import { heets } from "../../products/heets";
import { accessories } from "../../products/accessories";

function Category() {
  let route = useRouter();
  let category = route.query.category;
  const [itemsToMap, setItemsToMap] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    if (!category) {
      return;
    } else if (category == "iqos-devices") {
      setCategoryTitle("IQOS Devices");
      setItemsToMap(iqosDevices);
    } else if (category == "heets") {
      setCategoryTitle("HEETS");
      setItemsToMap(heets);
    } else if (category == "accessories") {
      setCategoryTitle("Accessories");
      setItemsToMap(accessories);
    } else {
      setItemsToMap([]);
    }
  }, [route]);

  return (
    <div className={styles.categories_container}>
      <FiltersContainer />
      <ItemsContainer title={categoryTitle} itemsToDisplay={itemsToMap} />
    </div>
  );
}

export default Category;

const FiltersContainer = () => {
  const [titleToSearch, setTitleToSearch] = useState("");

  return (
    <div className={styles.filters_container}>
      <h1>Filter container</h1>
    </div>
  );
};

const ItemsContainer = ({ itemsToDisplay, title }) => {
  return (
    <div className={styles.items_container}>
      <h1>{title}</h1>
      <p>Showing all {itemsToDisplay.length} results</p>
      <Container itemsToDisplay={itemsToDisplay} />
    </div>
  );
};
