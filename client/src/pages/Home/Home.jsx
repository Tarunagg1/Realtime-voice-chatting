import React, { Fragment } from "react";
import Card from "../../components/shared/Card/Card";
import style from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/shared/Button/Button';

export default function Home() {
  const signnInLinkStyle = {
    color: '#0077ff',
    fontWeight:'bold',
    textDecoration:'none',
    marginLeft:'20px'
  }

  const navigate = useNavigate();

  const startRegistration = ()=>{
    console.log('hehe');  
    navigate("/register");
  }

  return (
    <Fragment>
      <div className={style.cardWrappper}>
        <Card title="Welcome to voice chatting system" icon="kk">
          <p className={style.para}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            maxime voluptates architecto deserunt aut? Voluptatum iure
            distinctio neque voluptates vel?
          </p>

          <div>
            <Button onClick={startRegistration} label="Get your user name" />
          </div>

          <div className={style.signinnWrapper}>
            <span className={style.invite}>Have an invite text?</span>
            <Link to="/login" style={signnInLinkStyle}>SignIn</Link>
          </div>
        </Card>
      </div>
    </Fragment>
  );
}
