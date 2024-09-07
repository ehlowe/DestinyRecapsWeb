import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import InteractiveImageMap from '../stream_plot/sp';

const searchParams = new URLSearchParams(window.location.search);


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

    const [slow_details, setSlowDetails] = useState({});
        
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                {slow_details.plot_object!=null?
                    <InteractiveImageMap plotData={slow_details.plot_object} imageBase64={null} clickableAreas={null} widthPercentage={100}/>
                    :null
                }
            </div>
        </div>
    );
}

export default StreamPlot;