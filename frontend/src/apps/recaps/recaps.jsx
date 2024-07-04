import React, { useState, useEffect } from 'react';
import styles from "./recaps.module.css";


// returns true if the meta is HTML
function isHTML(meta){
    if (meta==null){
        return false;
    }

    //look for any header tags
    let header = meta.match(/<h[1-6]>/g);
    if (header){
        return true;
    }
    
    // look for list tags
    let list = meta.match(/<li>/g);
    if (list){
        return true;
    }

    //otherwise, return false
    return false;   
}



function Metas() {
    // Fetch metas from the API
    var [metas, setMetas] = useState([]);
    useEffect(() => {
        fetch('/api/metas/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch metas with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMetas(data);
            })
            .catch(error => {
                console.error('Error fetching metas:', error);
            });
    }, []);

    // Render metas
    return (
        <div className={styles.pageDiv}>
            <div className={styles.recapHeader}>
                <h1>Recaps</h1>
            </div>
            <div className={styles.recapsWrapper}>
                <div className={styles.allRecaps}>
                    {metas.map(meta => (
                        <div className={styles.recapContainer} key={meta.video_id}>
                            <div className={styles.recapInfoVideo}>
                                <div className={styles.recapInfo}>
                                    <strong className="meta-title">Title: { meta.title }</strong>
                                    <button className={styles.detailButton} onClick={() => window.location.href = `/details?video_id=${meta.video_id}`}>Details</button>
                                </div>
                                <div className={styles.recapVideo}>
                                    <iframe className={styles.recapIframe} src={`https://www.youtube.com/embed/${meta.video_id}`} border="0" allowFullScreen></iframe>
                                </div>
                            </div>
                            <div className={styles.recapContent}>
                                {(isHTML(meta.meta)==true)?(<div className={styles.recapTextarea} dangerouslySetInnerHTML={{__html: meta.meta}}></div>):(<textarea className={styles.recapTextarea} value={meta.meta} readOnly></textarea>)}
                            </div>

                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default Metas;