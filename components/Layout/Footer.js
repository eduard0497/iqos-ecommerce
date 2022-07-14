import React from "react";
import styles from "../../styles/Layout.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_inner}>
        <FooterOne />
      </div>
    </div>
  );
}

export default Footer;

const FooterOne = () => {
  return (
    <div className={styles.footer_one}>
      <div className={styles.footer_one_column}>
        <div className={styles.footer_one_column_title}>
          <h4>POLICIES</h4>
        </div>
        <div className={styles.footer_one_column_body}>
          <h4>Privacy Policy</h4>
          <h4>Terms of Service</h4>
          <h4>Shipping Policy</h4>
        </div>
      </div>
      <div className={styles.footer_one_column}>
        <div className={styles.footer_one_column_title}>
          <h4>CUSTOMER CARE</h4>
        </div>
        <div className={styles.footer_one_column_body}>
          <h4>Track Order</h4>
          <h4>My Account</h4>
          <h4>About Us</h4>
          <h4>FAQ</h4>
          <h4>Contact Us</h4>
          <h4>Our Blog</h4>
        </div>
      </div>
      <div className={styles.footer_one_column}>
        <div className={styles.footer_one_column_title}>
          <h4>FOLLOW</h4>
        </div>
        <div className={styles.footer_one_column_body}>
          <h4>Facebook</h4>
          <h4>Instagram</h4>
          <h4>Pinterest</h4>
          <h4>Youtube</h4>
        </div>
      </div>
      <div className={styles.footer_one_column}>
        <div className={styles.footer_one_column_title}>
          <h4>WANT DISCOUNTS?</h4>
        </div>
        <div className={styles.footer_one_column_body}>
          <div className={styles.footer_one_column_body_email_input}>
            <input type="text" placeholder="Your Email Address" />
            <button>Sign Up</button>
          </div>
          <p>
            Exclusive discount codes directly to your inbox! (we will not spam
            you)
          </p>
        </div>
      </div>
    </div>
  );
};

const FooterTwo = () => {};
