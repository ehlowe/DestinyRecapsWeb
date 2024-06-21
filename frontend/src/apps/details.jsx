import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { useSearchParams } from 'react-router-dom';

import "./details.css";





import TranscriptComponent from './transcript';

const Details = () => {
   
    // Set up state variables
    const [meta, setMeta] = useState({});
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('video_id');
    const [index, setIndex] = useState(null);
    
    const [transcriptIndexSelect, setTranscriptIndexSelect] = useState(null);
    const [transcriptIndexes, setTranscriptIndexes] = useState([]);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Meta Fetch
    useEffect(() => {
        fetch('/api/details?video_id=' + videoId)
            .then(response => response.json())
            .then(data => {
                setMeta(data);
            })
            .catch(error => console.error('Error fetching metas:', error));
    }, []);
    

    // Function for indexing the transcript with embeddings
    const fetchIndexData = useCallback(() => {
        // if (index!=null){
        if (true){
            const text_to_use=document.getElementsByClassName("embedding-search-input")[0].value;
            setLoading(true);
            fetch(`/api/get_query_index?video_id=${videoId}&query=${text_to_use}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setIndex(data.index); // Correctly set state
                    setTranscriptIndexSelect(0);//transcriptIndexSelect<5?transcriptIndexSelect+1:0);
                    setTranscriptIndexes(data.all_indexes);
                    setError(null); // Clear any previous errors
                })
                .catch(error => {
                    console.error('Fetch error:', error); // Debugging
                    setError(error.toString());
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);


    return (
        // breakpoint,
        <div className="detail-wrapper">
            <div className="summary-container">
                <div className="summary">
                    <textarea
                        className="summary-text"
                        value={meta.meta}
                        onChange={(e) => setMeta({ ...meta, meta: e.target.value })}
                    ></textarea>
                </div>
            </div>
            <div className="meta-wrapper">
                <div className="info-container">
                    <div className="meta-header">
                        <strong>{ meta.title }</strong>
                    </div>
                    <div className="meta-video">
                        <iframe className="meta-iframe" src={`https://www.youtube.com/embed/${meta.video_id}`} allowFullScreen>
                        </iframe>
                    </div>
                    <div className="meta-search">
                        <div className="embedding-div">
                            <p>Embedding Search: </p>
                            <input type="text" className="embedding-search-input" placeholder="Search transcript..." />
                        </div>
                        <div className="search-buttons">
                            {/* <button onClick={()=>EmbeddingSearch(document.getElementById('embedding-search-input').value)}> */}
                            <button onClick={fetchIndexData}>
                            {/* <button> */}
                                Search
                            </button>
                            <button id="next-button" onClick={() => setTranscriptIndexSelect(transcriptIndexSelect<4?transcriptIndexSelect+1:0)}>
                                Next {transcriptIndexSelect==null?null:String(transcriptIndexSelect)+'->'+String(transcriptIndexSelect<4?transcriptIndexSelect+1:0)}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <div><TranscriptComponent meta={meta} characterIndex={index} /></div> */}
                    <div><TranscriptComponent meta={meta} characterIndex={
                        transcriptIndexSelect==null?null:transcriptIndexes[transcriptIndexSelect]
                    } /></div>
                </div>
            </div>
        </div>
    )
};

export default Details;