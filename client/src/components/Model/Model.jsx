import React, { Fragment, useState } from 'react'
import styles from './Model.module.css';
import TextInput from '../shared/Textinput/Textinput';
import { useNavigate } from 'react-router-dom';
import { createRoomApi } from '../../helper/http';
import { toast } from 'react-toastify';

export default function Model({ onClose }) {
    const navigate = useNavigate();

    const [roomType, setRoomType] = useState('open');
    const [topic, setTopic] = useState('');

    const createRoom = async () => {
        if (!topic) {
            toast.error("topic required");
            return;
        }
        try {
            const { data } = await createRoomApi({ topic, roomType });
            navigate(`/room/${data.id}`);
        } catch (error) {
            // log
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <div className={styles.modalMask}>
                <div className={styles.modalBody}>
                    <button onClick={onClose} className={styles.closeButton}>
                        <img src="/images/close.png" alt="close" srcSet='' />
                    </button>

                    <div className={styles.modalHeader}>
                        <h3 className={styles.heading}>
                            Enter the topic to be disscussed
                        </h3>
                        <TextInput
                            fullwidth="true"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <h2 className={styles.subHeading}>Room types</h2>
                        <div className={styles.roomTypes}>
                            <div onClick={() => setRoomType("open")} className={`${styles.typeBox} ${roomType === 'open' ? styles.active : ''
                                }`}>
                                <img src="/images/globe.png" alt="globe" srcSet='' />
                                <span>Open</span>
                            </div>
                            <div onClick={() => setRoomType("social")} className={`${styles.typeBox} ${roomType === 'social' ? styles.active : ''
                                }`}>
                                <img src="/images/social.png" alt="social" srcSet='' />
                                <span>Social</span>
                            </div>
                            <div onClick={() => setRoomType("private")} className={`${styles.typeBox} ${roomType === 'private' ? styles.active : ''
                                }`}>
                                <img src="/images/lock.png" alt="lock" srcSet='' />
                                <span>Private</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <h2>Start a room, open to everyone</h2>
                        <button
                            className={styles.footerButton}
                            onClick={createRoom}
                        >
                            <img src="/images/celebration.png" alt="celebration" srcSet="" />
                            <span >Let's go</span>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
