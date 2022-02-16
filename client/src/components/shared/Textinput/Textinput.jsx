import React, { Fragment } from 'react'
import './textinput.modele.css';

export default function Textinput(props) {
  return (
    <Fragment>
          <input className="textinput" {...props} />
    </Fragment>
  )
}
