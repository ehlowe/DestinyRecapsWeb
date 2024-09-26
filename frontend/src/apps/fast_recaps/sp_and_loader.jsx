import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InteractiveImageMap from '../stream_plot/sp';
import styles from "./sp_and_loader.module.css";

import return_placeholder_object from './placeholder_plot';

function StreamPlot() {
    const navigate = useNavigate();
    const location = useLocation();
    const [videoId, setVideoId] = useState('');
    const [userInput, setUserInput] = useState('');
    const [slowDetails, setSlowDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState(20);
    const [random_fact_index, setRandomFactIndex] = useState(0);

    const did_you_know_facts = [
        "Did you know that the shortest war in history lasted 38 minutes?",
        "Did you know that octopuses have three hearts?",
        "Did you know that the world's largest desert is Antarctica?",
        "Did you know that a group of flamingos is called a 'flamboyance'?",
        "Did you know that the first oranges weren't orange?",
        "Did you know that there are more possible iterations of a game of chess than there are atoms in the known universe?",
        "Did you know that bananas are berries, but strawberries aren't?",
        "Did you know that the longest English word without a vowel is 'rhythms'?",
        "Did you know that the Great Wall of China is not visible from space with the naked eye?",
        "Did you know that a jiffy is an actual unit of time: 1/100th of a second?",
        "Did you know that the fingerprints of koalas are virtually indistinguishable from human fingerprints?",
        "Did you know that the longest word in the English language without a vowel is 'rhythms'?",
        "Did you know that the inventor of the frisbee was turned into a frisbee after he died?",
        "Did you know that cats can't taste sweetness?",
        "Did you know that the dot over the letter 'i' is called a tittle?",
        "Did you know that the average person will spend six months of their life waiting for red lights to turn green?",
        "Did you know that a flock of crows is called a murder?",
        "Did you know that the longest place name in the world is 85 letters long?",
        "Did you know that rabbits can't vomit?",
        "Did you know that the King of Hearts is the only king in a deck of cards without a mustache?"
    ]

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const urlVideoId = searchParams.get('video_id');
        if (urlVideoId) {
            setVideoId(urlVideoId);
            setUserInput(urlVideoId);
            generateRecap(urlVideoId);
        }else{
            setSlowDetails(return_placeholder_object());
        }
    }, [location]);

    useEffect(() => {
        let timer;
        if (isLoading && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isLoading, countdown]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const extractedId = extractVideoId(userInput);
        if (extractedId) {
            setVideoId(extractedId);
            navigate(`?video_id=${encodeURIComponent(extractedId)}`, { replace: true });
        } else {
            setError('Please enter a valid YouTube video URL or ID');
        }
    };

    const extractVideoId = (input) => {
        if (input.length === 11) return input;
        const match = input.match(/(?:watch\?v=|\/live\/|\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };

    const generateRecap = (id) => {
        setIsLoading(true);
        setRandomFactIndex(Math.floor(Math.random() * did_you_know_facts.length));
        setError(null);
        setCountdown(20);
        fetch(`/api/fast_recap?video_id=${id}`)
            .then(response => response.json())
            .then(data => {
                setSlowDetails(data);
                console.log("Loaded fast recap details");
            })
            .catch(error => {
                console.error('Error fetching fast recap:', error);
                setError('Failed to generate recap. Please try again.');
                setSlowDetails(return_placeholder_object());
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div>
                        <h3>Video Plot Generator (20-30 seconds)</h3>
                        {videoId && (
                            <a className={styles.videoLink} href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer">
                                https://www.youtube.com/watch?v=${videoId}
                            </a>
                        )}
                        <form onSubmit={handleSubmit} className={styles.inputSection}>
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                placeholder="Paste YouTube Video URL or ID"
                                className={styles.videoIdInput}
                            />
                            <button type="submit" disabled={isLoading} className={styles.generateButton}>
                                {isLoading ? 'Generating...' : 'Load/Generate'}
                            </button>
                        </form>
                    </div>
                    {/*<div>
                        <div className={styles.socialLinks}>
                            <text>Feel free to share!</text>
                            <a href="https://twitter.com/zapperstrudel">Got Feedback for me?</a>
                            <text>My Social Media:</text>
                            <a href="https://twitter.com/zapperstrudel">Twitter</a>
                            <a href="">Reddit</a>
                        </div>
                    </div>
                    */}
                </div>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}
            
            <div className={styles.streamPlot}>
                {isLoading ? (
                    <div className={styles.plotLoadingInfo}>
                        <h2>Loading... Estimated time: {countdown} seconds</h2>
                        <h2>{did_you_know_facts[random_fact_index]}</h2>
                    </div>
                ) : slowDetails?.plot_object?.plot_parameters ? (
                    <div style={{ position: 'relative' }}>
                        <InteractiveImageMap 
                            plotData={slowDetails.plot_object} 
                            imageBase64={null} 
                            clickableAreas={null} 
                            widthPercentage={100}
                        />
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '29%',
                            backgroundColor: '#f0f0f0',
                            zIndex: 1
                        }}></div>
                    </div>
                ) : (
                    <div className={styles.plotLoadingInfo}>
                        <h2>Error Generating, Regeneration of the same video isn't a feature yet.</h2>
                    </div>
                )}
                <h5>Hovering over the bubbles will reveal a summary of that topic. Clicking Segments will take you to the timestamp.<br></br> These are AI generated. The transcript used and subsequent summaries may be inaccurate. Input video Can't be over ~9 hours of content. </h5>
                <div style={{display: "block", color: "white", backgroundColor: "white", zIndex: 1}}>          
                    <span style={{
                            margin: "10px",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            color: "black",
                            fontSize: "10px",
                            }}>This website is an experimental tool created for educational and non-commercial purposes only. The summarization feature is provided as a test of AI-based summarization technology, and no revenue is generated from its operation.<br></br>
                        
                        The summaries generated on this website are based on transcripts provided by YouTube videos. All original content, including video transcripts, remains the property of their respective copyright holders. This tool is not affiliated with or endorsed by YouTube or any of the content creators whose videos are summarized. If you are a copyright holder and have concerns about the use of your content, please contact me at <a href="https://twitter.com/zapperstrudel">https://twitter.com/zapperstrudel</a>, and I will take prompt action. 
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StreamPlot;