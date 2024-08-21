import React, { useState, useEffect } from 'react';
import styles from "./recaps.module.css";
import ChatComponent from '../chat_module/chat';

import WeeklyRecap from './weekly_recap';

// returns true if the meta is HTML
function isHTML(recap){
    if (recap==null){
        return false;
    }

    //look for any header tags
    let header = recap.match(/<h[1-6]>/g);
    if (header){
        return true;
    }
    
    // look for list tags
    let list = recap.match(/<li>/g);
    if (list){
        return true;
    }

    //otherwise, return false
    return false;   
}



function Recaps() {
    // Fetch recaps from the API
    var [recaps, setRecaps] = useState([]);
    var [weekly_recaps, setWeeklyRecaps] = useState([]);
    useEffect(() => {
        fetch('/api/recaps/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch recaps with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setRecaps(data);
            })
            .catch(error => {
                console.error('Error fetching recaps:', error);
            });
    }, []);

    useEffect(() => {
        fetch('/api/weekly_recaps/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch recaps with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setWeeklyRecaps(data);
            })
            .catch(error => {
                console.error('Error fetching recaps:', error);
            });
    }, []);

    // when the weekly_recaps state changes, log the state
    useEffect(() => {
        console.log(weekly_recaps);
    }, [weekly_recaps]);

    // Render recaps
    return (
        <div className={styles.pageDiv}>
            <div className={styles.recapHeader}>
                <h1>Recaps</h1>
            </div>
            <div className={styles.recapsWrapper}>
                <div className={styles.allRecaps}>
                    <ChatComponent urlPath={'/api/homepage_chatbot_response'} videoId={'none'}/>
                    {recaps.map(recap => (
                        <div className={styles.recapContainer} key={recap.video_id}>
                            <div className={styles.recapInfoVideo}>
                                <div className={styles.recapInfo}>
                                    <strong className={styles.recapTitle}>Title: { recap.video_characteristics.title }</strong>
                                    <button className={styles.detailButton} onClick={() => window.location.href = `/details?video_id=${recap.video_id}`}>Details</button>
                                </div>
                                <div className={styles.recapVideo}>
                                    <iframe className={styles.recapIframe} src={`https://www.youtube.com/embed/${recap.video_id}`} border="0" allowFullScreen></iframe>
                                </div>
                            </div>
                            <div className={styles.recapContent}>
                                {(isHTML(recap.recap)==true)?(<div className={styles.recapTextarea} dangerouslySetInnerHTML={{__html: recap.recap}}></div>):(<textarea className={styles.recapTextarea} value={recap.recap} readOnly></textarea>)}
                            </div>

                        </div>
                    ))
                }
                </div>
                {/* <div className={styles.weeklyRecapsWrapper}>
                    {weekly_recaps.map(weekly_recap => (
                        <div>
                            <WeeklyRecap {...weekly_recap} />
                        </div>
                        
                    ))} 
                </div> */}
            </div> 



            {/* <div>
                {weekly_recaps.map(weekly_recap => (
                    <img src={`data:image/png;base64,${weekly_recap.week_image}`} alt="weekly recap" />
                ))} 
            </div> */}
        </div>
    );
}

export default Recaps;