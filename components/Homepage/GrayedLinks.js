import React from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

function GrayedLinks() {
  const arrayToMap = [
    {
      image: "https://heat-tobacco.com/wp-content/uploads/2020/06/iqos-3.jpg",
      title: "IQOS Devices",
      startingPrice: "from $95.99",
      linkToPushTo: "/categories/iqos-devices",
    },
    {
      image: "https://heat-tobacco.com/wp-content/uploads/2020/06/heets-1.jpg",
      title: "HEETS",
      startingPrice: "from $56.99",
      linkToPushTo: "/categories/heets",
    },
    {
      image:
        "https://heat-tobacco.com/wp-content/uploads/2020/06/accessories.jpg",
      title: "Accessories",
      startingPrice: "from $7.99",
      linkToPushTo: "/categories/accessories",
    },
  ];

  return (
    <div className={styles.grayed_links_container}>
      {arrayToMap.map((item, index) => (
        <div className={styles.grayed_links_item} key={index}>
          <img src={item.image} alt="iqos" />
          <div className={styles.grayed_links_item_info}>
            <strong>{item.title}</strong>
            <em>{item.startingPrice}</em>
            <Link href={item.linkToPushTo}>
              <span>Shop Now</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GrayedLinks;
