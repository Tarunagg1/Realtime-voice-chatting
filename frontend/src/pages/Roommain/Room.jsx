import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomApi } from '../../helper/http';
import { useWebTRTC } from '../../hooks/useWebTRTC';
import styles from './Room.module.css';

export default function Room() {

  const user = useSelector((state) => state.auth.user);

  const { id: roomId } = useParams();
  const { clients, provideRef, handelMute } = useWebTRTC(roomId, user);
  const [room, setRoom] = useState(null);


  const [isMute, setMute] = useState(true);

  useEffect(() => {
    handelMute(isMute, user.id);

    // eslint-disable-next-line
  }, [isMute])

  const navigate = useNavigate();

  const handelManualLeave = () => {
    navigate('/roooms');
  }

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoomApi(roomId);
      setRoom(data);
    }
    fetchRoom();
  }, [roomId]);

  const handelMuteBtnCLick = (clientId) => {
    if(clientId !== user.id){
      return;
    }
    setMute((prev) => !prev);
  }


  return (
    <Fragment>
      <div>
        <div className="container">
          <button onClick={handelManualLeave} className={styles.goBack}>
            <img src="/images/arrow-left.png" alt="back" srcSet="" />
            <span>All voice rooms</span>
          </button>
        </div>

        {/* <h1>All connected clients</h1> */}
        <div className={styles.clientWrap}>
          <div className={styles.header}>
            <h2 className={styles.actionButton}>{room && room?.topic}</h2>
            <div className={styles.actions}>
              <button className={styles.actionBtn}>
                <img src="/images/palm.png" alt="plam" srcSet="" />
              </button>
              <button onClick={handelManualLeave} className={styles.actionBtn}>
                <img src="/images/win.png" alt="min" srcSet="" />
                <span>Leave quietly</span>
              </button>
            </div>
          </div>

          <div className={styles.clientsList}>
            {
              clients && clients.map((ele, ind) => {
                // console.log(ele);
                return (
                  <div key={ind} className={styles.client}>
                    <div className={styles.userHead}>
                      <audio
                        autoPlay
                        ref={(instance) => (provideRef(instance, ele.id))}
                      />
                      <img className={styles.userAvatar} src={ele.avatar} alt="avatar" srcSet="" />
                      <button onClick={() => handelMuteBtnCLick(ele.id)} className={styles.micBtn}>
                        {
                          ele?.muted ? (
                            <img className={styles.micImg} src="/images/mic-mute.png" alt="mic" />
                          ) : (
                            <img className={styles.micImg} src="/images/mic.png" alt="mic off" />
                          )
                        }
                      </button>
                    </div>
                    <p>{ele.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Fragment>
  )
}
