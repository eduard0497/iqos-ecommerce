import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Layout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CouponBanner from "../Reusable/CouponBanner";
import "@stripe/stripe-js";

function Layout({ children }) {
  let router = useRouter();

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (router.pathname == "/success") {
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
  }, [router]);

  return (
    <>
      {showSuccess ? (
        <>{children}</>
      ) : (
        <div>
          <Navbar />
          <CouponBanner />
          <div className={styles.children_general_container}>{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Layout;
