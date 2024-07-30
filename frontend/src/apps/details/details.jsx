import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from "./details.module.css";

// import loading gif
import transparentLoadingGif from '../../assets/loading_transparent.gif';
const loadingGif=transparentLoadingGif;

// import transcript component
import TranscriptComponent from './transcript';
import ChatComponent from '../chat_module/chat';
import InteractiveImageMap from '../stream_plot/stream_plot2';

// returns true if the recap is HTML
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


const Details = () => {
   
    // Set up state variables
    const [recap, setRecap] = useState({});
    const [linked_transcript, setLinkedTranscript] = useState(null);
    const [linked_transcript_error, setLinkedTranscriptError] = useState(null);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('video_id');
    const [index, setIndex] = useState(null);
    
    const [transcriptIndexSelect, setTranscriptIndexSelect] = useState(null);
    const [transcriptIndexes, setTranscriptIndexes] = useState([]);


    const [slow_details, setSlowDetails] = useState({});



    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Recap Fetch
    useEffect(() => {
        fetch('/api/recap_details?video_id=' + videoId)
            .then(response => response.json())
            .then(data => {
                setRecap(data);
            })
            .catch(error => console.error('Error fetching recap:', error));
    }, []);

    useEffect(() => {
        fetch('/api/linked_transcript?video_id=' + videoId)
            .then(response => response.json())
            .then(data => {
                setLinkedTranscript(data);
            })
            .catch (error => {
                console.error('Error fetching linked transcript:', error);
                setLinkedTranscriptError(error);
            });
    }, []);

    useEffect(() => {
        fetch('/api/slow_recap_details?video_id=' + videoId)
            .then(response => response.json())
            .then(data => {
                setSlowDetails(data);
                console.log("Loaded slow recap details")
            })
            .catch(error => console.error('Error fetching slow recap:', error));
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
    var rand_num=Math.random();
    rand_num=rand_num*10;
    rand_num=Math.round(rand_num);

    // page_width equal to dyanmic width of the page
    var page_width=window.innerWidth;
    console.log("Page Width: ", page_width);
    
    return (
        <div className={styles.pageWrapper}>
            {/* Insert Stream Plot but only if the imagePlotBase64 is not null and the length is >100 */}
            {/* {slow_details.plot_image!=null && slow_details.plot_image.length>100?
                <InteractiveImageMap imageBase64={slow_details.plot_image} clickableAreas={slow_details.plot_clickable_area_data} />
                :null
            } */}

            <div className={styles.streamPlot}>
                <div className={styles.streamPlotPlacing}>
                    {slow_details.plot_image!=null && slow_details.plot_image.length>100?
                        <InteractiveImageMap imageBase64={slow_details.plot_image} clickableAreas={slow_details.plot_clickable_area_data} widthPercentage={100}/>
                        :null
                    }
                    <h2 className={styles.plotFooter}>Click the Bars Segments^ to watch the segment on youtube</h2>
                </div>
                {/* <h2>Click the Bars to ride the hyperlink to the timestamp</h2> */}
            </div>

            <div className={styles.detailWrapper}>

                {/* Load the base64 image from slow_details.plot_image */}

                {/* Container for the recap */}
                <div className={styles.recapContainer}>
                    
                    {/* <InteractiveImageMap imageBase64={slow_details.plot_image} clickableAreas={slow_details.plot_clickable_area_data} /> */}

                    {/* {slow_details.plot_image!=null && slow_details.plot_image.length>100?
                        <InteractiveImageMap imageBase64={slow_details.plot_image} clickableAreas={slow_details.plot_clickable_area_data} />
                        :null
                    } */}

                    <div className={styles.recap}>
                        {(isHTML(recap.recap)==true)?<div className={styles.recapHtml} dangerouslySetInnerHTML={{__html: recap.recap}} onChange={(e) => setRecap({ ...recap, recap: e.target.value })}></div>:<textarea
                            className={styles.recapPlainText}
                            value={recap.recap}
                            onChange={(e) => setRecap({ ...recap, recap: e.target.value })}
                        ></textarea>}
                    </div>
                </div>

                {/* Wrapper for search, video informaton, and transcript */}
                <div className={styles.infoSearchTranscriptWrapper}>
                    <ChatComponent urlPath={'/api/chatbot_response'} videoId={videoId} />
                    <div className={styles.infoSearchTranscriptContainer}>
                        {/* Transcript Search and Video Information */}
                        <div className={styles.infoSearchContainer}>
                            <div className={styles.search}>
                                <div className={styles.recapHeader}>
                                    <strong>{
                                        //get title from video_characteristics dictionary
                                        (recap.video_characteristics!=null)?
                                        recap.video_characteristics.title:null
                                    }</strong>
                                </div>
                                <div className={styles.searchField}>
                                    <p>Embedding Search: </p>
                                    <input type="text" className="embedding-search-input" placeholder="Search transcript..." />
                                </div>
                                <div className={styles.searchButtons}>
                                    <button onClick={fetchIndexData}>
                                        {(loading)?((Math.round(Math.random()*10))%9==0)?<img src={loadingGif}/>:<img src={transparentLoadingGif}/>:"Search"}
                                    </button>
                                    <button id="next-button" onClick={() => setTranscriptIndexSelect(transcriptIndexSelect<4?transcriptIndexSelect+1:0)}>
                                        Next {transcriptIndexSelect==null?null:String(transcriptIndexSelect)+'->'+String(transcriptIndexSelect<4?transcriptIndexSelect+1:0)}
                                    </button>
                                </div>
                            </div>
                            <div className={styles.videoContainer}>
                                <iframe className={styles.recapIframe} src={`https://www.youtube.com/embed/${recap.video_id}`} allowFullScreen>
                                </iframe>
                            </div>
                        </div>

                        {/* Transcript */}
                        <div className={styles.transcriptContainer}>
                            {
                                linked_transcript!=null?
                                <div className={styles.linkedTranscript}><TranscriptComponent linked_transcript={linked_transcript.linked_transcript} characterIndex={
                                    transcriptIndexSelect==null?null:transcriptIndexes[transcriptIndexSelect]
                                } /></div>
                                :
                                <div className={styles.nonlinkedTranscriptContainer}>
                                    {linked_transcript_error!=null?
                                        null:
                                        <h3 style={{color: 'white'}}>
                                            Loading Hyperlinked Transcript...
                                        </h3>
                                    }
                                    <textarea className={styles.nonlinkedTranscript} value={recap.transcript}/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Details;