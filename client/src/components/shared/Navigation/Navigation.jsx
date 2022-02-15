import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./navigation.module.css";

export default function Navigation() {
    const baseStyle = {
        color: "#fff",
        textDecoration: "none",
        fontWeight:'bold',
        fontSize:'22px',
        display: 'flex',
        alignItems: 'center'
    }

    const logotext = {
        marginLeft:'10px'
    }

  return (
    <Fragment>
      <nav className={`container ${styles.navbar}`}>
        <Link style={baseStyle} to="/">
          <span>Voice chatting system</span>
        </Link>
      </nav>
    </Fragment>
  );
}
