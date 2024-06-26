import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import "./metas.css";





function Metas() {

    // // Google Analytics
    // const location = useLocation();
    // useEffect(() => {
    //   if (window.gtag) {
    //     window.gtag('config', 'G-5D9W9V02H0', {
    //       page_path: location.pathname,
    //     });
    //   }
    // }, [location]);


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

    return (

        <div className='page-div'>
            <div className="meta-header">
                <h1>Recaps</h1>
            </div>
            <div className="metas-wrapper">
                <div className="all-metas">
                    {metas.map(meta => (
                        <div className="meta-container">
                            <div className='meta-details'>
                                <div className="meta-info">
                                    <strong className="meta-title">Title: { meta.title }</strong>
                                    <button className="detail-button" onClick={() => window.location.href = `/details?video_id=${meta.video_id}`}>Details</button>
                                </div>
                                <div className="meta-video">
                                    <iframe className="meta-iframe" src={`https://www.youtube.com/embed/${meta.video_id}`} frameborder="0" allowfullscreen></iframe>
                                </div>
                            </div>
                            <div className="meta-content">
                                <textarea className="meta-textarea">{ meta.meta }</textarea>
                            </div>

                        </div>
                    ))}
                </div>
                {/* <div className="chat-embed-div">
                    <iframe className="chat-embed" src="https://www.destiny.gg/embed/chat" frameborder="0" allowfullscreen></iframe>
                </div> */}
            </div>
        </div>
    );
}

export default Metas;