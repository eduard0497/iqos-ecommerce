import React from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { homepageBanner } from "../Resources/logos_images.js";

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.banner_left}>
        <div>
          <h2>Up to 36% off!</h2>
        </div>
        <div>
          <h4>Do not miss IQOS 3 DUO at incredible prices.</h4>
          <h4>
            International Warranty! {` `}
            <strong>Free worldwide shipping!</strong>
          </h4>
        </div>
        <div>
          <Link href="/categories/iqos-devices">
            <a>Choose yours →</a>
          </Link>
        </div>
      </div>
      <div className={styles.banner_right}>
        <img src={homepageBanner} width="100%" height="100%" />
      </div>
    </div>
  );
}

export default Banner;
