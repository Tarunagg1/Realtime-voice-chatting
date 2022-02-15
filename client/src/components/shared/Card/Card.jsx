import React, { Fragment } from "react";
import style from "./card.module.css";

export default function Card({ title, icon, children }) {
  return (
    <Fragment>
        <div className={style.card}>
          <div className={style.haddingWrapper}>
            <h1 className={style.heading}>{title}</h1>
          </div>
          {children}
        </div>
    </Fragment>
  );
}
