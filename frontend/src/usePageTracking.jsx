// src/usePageTracking.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'Homepage',
  '/about': 'About',
  '/details': 'Details Page',
  // Add more paths and titles as needed
};

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get('video_id');
    const title = pageTitles[path] || 'Unknown Page';


    // Include video_id if available
    console.log("TRYING TO CHANGE TITLE: ",title);
    console.log("VidoeID", videoId);
    console.log("Location", location);
    console.log("Path", path);
    if (videoId) {
      //document.title = title
      document.title= `${title} - Video ${videoId}`;
    } else {
      document.title = title;
    }

    // document.title= `${title} - Video ${videoId}`


  }, [location]);
}

export default usePageTracking;

