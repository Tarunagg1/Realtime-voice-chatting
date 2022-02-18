import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';


export default function Room() {

  const user = useSelector((state) => state.auth.user);
    const { id: roomId } = useParams();
    const [room, setRoom] = useState(null);


  return (
    <Fragment>
        this is single room
    </Fragment>
  )
}
