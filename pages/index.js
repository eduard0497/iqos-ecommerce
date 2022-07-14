import Banner from "../components/Homepage/Banner";
import GrayedLinks from "../components/Homepage/GrayedLinks";
import PopularProducts from "../components/Homepage/PopularProducts";
import WhatIsIt from "../components/Homepage/WhatIsIt";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.homepage_container}>
      <div className={styles.homepage_general_container}>
        <Banner />
      </div>
      <div className={styles.homepage_general_container}>
        <GrayedLinks />
      </div>
      <div className={styles.homepage_general_container}>
        <PopularProducts />
      </div>
      <div className={styles.homepage_general_container}>
        <WhatIsIt />
      </div>
    </div>
  );
}
