import React, { useState } from 'react';
import InteractiveImageMap from '../stream_plot/sp';
import styles from "./sp_and_loader.module.css";

// Main app component
function StreamPlot() {
    var [videoId, setVideoId] = useState('');
    var [slowDetails, setSlowDetails] = useState(return_placeholder_object());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    // set slowDetails to a placeholder object
    function return_placeholder_object() {
        slowDetails={}
        slowDetails.plot_object={
            plot_parameters: {
                background_color: 0x606060,
                plotting_width: 10,
                plotting_height: 10,
                bar_height_setting: 0.15,
                upper_y: 0.55,
                lower_y: 0.7,
                circle_size_multiplier: 0.1,
                circle_size_offset: 0.08,
                abstraction_width_cutoff: 0.05,
                central_y: 0.7,
                video_id: "s82MKbp-R8w"
            },
            time_normalization: {
                start_offset: 28960,
                net_duration: 8187839
            },
            segments: [
                {
                    category: "^ Do the thing",
                    color: "#006fcd",
                    start_time: 0,
                    end_time: 1,
                    width: 1.0,
                    x: 0.5,
                    texts: [
                        "The raw text of the segment"
                    ],
                    annotations: [
                        "A bit shorter and simplier than the recap."
                    ],
                    href: "https://youtu.be/dQw4w9WgXcQ?t=0",
                    recap: "This is the segment recap, clicking on this will pop up the video at the timestamp of this segment."
                },
            ],
            abstractions: {
                "^ Do the thing": {
                    width: 1.0,
                    color: "#006fcd",
                    x: 0.5,
                    y: 0.7,
                    size: 0.20099283798804707,
                    recap: "This the abstraction recap, it summarizes the content of all the contained segments."
                },
            }
        }
        return slowDetails;
    }

    const handleInputChange = (e) => {
        setVideoId(e.target.value);
    };

    const generateRecap = () => {
        // make sure the videoId is valid or manipulate it to be valid
        if(videoId === '') {
            setError('Please enter a valid video ID');
            return;
        }else if(videoId.length < 11) {
            setError('Please enter a valid video ID');
            return;
        }else if(videoId.length > 11) {
            // Extract 11 characters after watch?v=, /live/, or .be/
            const match = videoId.match(/(?:watch\?v=|\/live\/|\.be\/)([a-zA-Z0-9_-]{11})/);
            if (match) {
                videoId = match[1];
            } else {
                setError('Please enter a valid YouTube video URL or ID');
                return;
            }
        }

        setIsLoading(true);
        setError(null);
        fetch(`/api/fast_recap?video_id=${videoId}`)
            .then(response => response.json())
            .then(data => {
                setSlowDetails(data);
                console.log("Loaded fast recap details");
            })
            .catch(error => {
                console.error('Error fetching fast recap:', error);
                setError('Failed to generate recap. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <h3>Video Plot Generator</h3>
                <div className={styles.inputSection}>
                    <input
                        type="text"
                        value={videoId}
                        onChange={handleInputChange}
                        placeholder="Paste YouTube Video URL or ID"
                        className={styles.videoIdInput}
                    />
                    <button onClick={generateRecap} disabled={isLoading} className={styles.generateButton}>
                        {isLoading ? 'Generating...' : 'Load/Generate'}
                    </button>
                </div>
            </div>



            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.streamPlot}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : slowDetails && slowDetails.plot_object && slowDetails.plot_object.plot_parameters ? (
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
                ) : slowDetails ? (
                    <p>No plot data available</p>
                ) : null}
                <h5>This is AI generated. Transcript and summaries may be inaccurate.</h5>
            </div>

        </div>
    );
}

export default StreamPlot;