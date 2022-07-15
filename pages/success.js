import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Success.module.css";

function Success() {
  let router = useRouter();

  useEffect(() => {
    localStorage.removeItem("cartItems");
  }, []);

  const goBack = async () => {
    await router.push("/");
    router.reload(window.location.pathname);
  };

  return (
    <div className={styles.success_container}>
      <div className={styles.success_container_inner}>
        <h1>Payment was successful</h1>
        <h2>You will receive email shortly</h2>
        <button onClick={goBack}>Go Back...</button>
      </div>
    </div>
  );
}

export default Success;
