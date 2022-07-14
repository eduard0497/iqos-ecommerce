import React from "react";
import styles from "../../styles/Reusable/CouponBanner.module.css";

function CouponBanner() {
  return (
    <div className={styles.coupon_container}>
      <p>
        Use Coupon Code “SPECIAL23%” On Order Over $350 And Get 23% Discount.
      </p>
    </div>
  );
}

export default CouponBanner;
