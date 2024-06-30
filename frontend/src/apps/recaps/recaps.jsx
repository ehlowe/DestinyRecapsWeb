import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import "./recaps.css";



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
                        <div className="meta-container" key={meta.video_id}>
                            <div className='meta-details'>
                                <div className="meta-info">
                                    <strong className="meta-title">Title: { meta.title }</strong>
                                    <button className="detail-button" onClick={() => window.location.href = `/details?video_id=${meta.video_id}`}>Details</button>
                                </div>
                                <div className="meta-video">
                                    <iframe className="meta-iframe" src={`https://www.youtube.com/embed/${meta.video_id}`} border="0" allowFullScreen></iframe>
                                </div>
                            </div>
                            <div className="meta-content">
                                {(isHTML(meta.meta)==true)?(<div className="meta-textarea" dangerouslySetInnerHTML={{__html: meta.meta}}></div>):(<textarea className="meta-textarea" value={meta.meta} readOnly></textarea>)}
                                {/* <textarea className="meta-textarea">{ meta.meta }</textarea> */}
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