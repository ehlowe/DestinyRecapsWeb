import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import InteractiveImageMap from '../stream_plot/sp';

const searchParams = new URLSearchParams(window.location.search);

import styles from "./sp_and_loader.module.css";


// Main app component
function StreamPlot() {

    const videoId = searchParams.get('video_id');
    useEffect(() => {
        fetch('/api/fast_recap?video_id=' + videoId)
            .then(response => response.json())
            .then(data => {
                setSlowDetails(data);
                console.log("Loaded slow recap details")
            })
            .catch(error => console.error('Error fetching slow recap:', error));
    }, []);

    const [slow_details, setSlowDetails] = useState(null);
    console.log("Slow details: ", slow_details);

    if (slow_details!=null){
        if (slow_details.plot_object!={}){
            // check if the slow_details.plot_object dictionary has plot_parameters value, print the value
            if (slow_details.plot_object.plot_parameters!=null){
                console.log("Plot parameters: ", slow_details.plot_object.plot_parameters);
            } else {
                console.log("Plot parameters are empty");
            }


        } else {
            console.log("Slow details plot object is empty");
        }
    }
        
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.streamPlot}>
                <div className={styles.streamPlotPlacing}>
                    {(slow_details!=null)?(slow_details.plot_object.plot_parameters!=null)?
                        <InteractiveImageMap plotData={slow_details.plot_object} imageBase64={null} clickableAreas={null} widthPercentage={100}/>
                        :<h1>Error</h1>:<h1>Loading</h1>
                    }
                </div>
            </div>
            <h1>Dist</h1>
        </div>
    );
}

export default StreamPlot;