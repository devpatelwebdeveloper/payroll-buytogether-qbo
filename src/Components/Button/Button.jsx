import React from "react";
import styles from "./Button.module.scss";
const Button = (props) => {
 return (
  <a className={`${styles.btn} ${props.variant === "primary" ? styles.btnprimary : styles.btnsecondary}`}
   {...props}>
   <span className={styles.btntext}>{props.children}</span>
  </a>
 )
};

export default Button