import React, { Fragment } from 'react'
import style from './button.module.css';

export default function Button({label,onClick}) {
  return (
    <Fragment>
        <button onClick={onClick} className={style.button}>
            <span>{label}</span>
        </button>
    </Fragment>
  )
}
