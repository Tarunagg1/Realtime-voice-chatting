import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Roomcard.module.css';

export default function Roomcard({ room }) {
    const navigate = useNavigate();
    return (
        <Fragment>
            <div onClick={() => navigate(`/room/${room.id}`)} className={styles.card}>
                <h3 style={styles.topic}>{room.topic}</h3>
                <div className={`${styles.speakers} ${room.speakers.length === 1 ? styles.singleSpeaker : ''
                    }`}
                >
                    <div className={styles.avatars}>
                        {room.speakers.map((speaker) => (
                            <img
                                key={speaker.id}
                                src={speaker.avatar}
                                alt="speaker-avatar"
                                srcSet=''
                            />
                        ))}
                    </div>
                    <div className={styles.names}>
                        {room.speakers.map((speaker) => (
                            <div key={speaker.id} className={styles.namesWrapper}>
                                <span>{speaker.name}</span>
                                <img
                                    src="/images/chat-bubble.png"
                                    alt="chat-bubble"
                                    srcSet=''
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.peopleCount}>
                    <span>{room && room.speakers.length}</span>
                    <img src="/images/user-icon.png" alt="user-icon" srcSet='' />
                </div>
            </div>
        </Fragment>
    )
}
