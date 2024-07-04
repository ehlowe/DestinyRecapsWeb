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

    if (videoId) {
      document.title= `${title} - Video ${videoId}`;
    } else {
      document.title = title;
    }
  }, [location]);
}

export default usePageTracking;

