import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Layout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CouponBanner from "../Reusable/CouponBanner";

function Layout({ children }) {
  const [showSideFilter, setShowSideFilter] = useState(false);

  let route = useRouter();

  useEffect(() => {
    if (route.pathname == "/iqos-devices") {
      setShowSideFilter(true);
    } else {
      setShowSideFilter(false);
    }
  }, [route]);

  return (
    <div>
      <Navbar />
      <CouponBanner />
      {showSideFilter ? (
        <div className={styles.searchFilter_and_children_container}>
          <div>Search Filter</div>
          <div className={styles.children_general_container}>{children}</div>
        </div>
      ) : (
        <div className={styles.children_general_container}>{children}</div>
      )}
      <Footer />
    </div>
  );
}

export default Layout;
