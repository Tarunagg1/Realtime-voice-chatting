import React, { Fragment, useEffect, useState } from 'react'
import Model from '../../components/Model/Model';
import Roomcard from '../../components/Roomcard/Roomcard';
import { getRoomApi } from '../../helper/http';
import styles from './rooms.module.css';

export default function Rooms() {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([])

  const openModel = ()=>{
    setOpen(true);
  }

  const onClose = ()=>{
    setOpen(false);
  }

  useEffect(() => {
     const fetchRooms = async ()=>{
       const {data} = await getRoomApi();
       setRooms(data);
     }
     fetchRooms();
  }, [])
  

  return (
    <Fragment>
      <div className="container">
        <div className={styles.rooomHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="search logo" srcset="" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModel} className={styles.startButton}>
              <img src="/images/add-room-icon.png" alt="add logo" srcset="" />
              <span>Start the room</span>
            </button>
          </div>
        </div>

        {/* lists */}

        <div className={styles.roomList}>
          {rooms && rooms.map((room) => (
            <Roomcard key={room.id} room={room} />
          ))}
        </div>
      </div>

      { 
          open && <Model  onClose={onClose} />
      }
    </Fragment>
  )
}
