// import React from 'react';

// const InteractiveImageMap = ({ imageBase64, clickableAreas }) => {
//   const handleClick = (href) => {
//     window.open(href, '_blank');
//   };

//   return (
//     <div style={{ position: 'relative', display: 'inline-block' }}>
//       <img src={`data:image/png;base64,${imageBase64}`} alt="Interactive Map" />
//       {clickableAreas.map((area, index) => (
//         <div
//           key={index}
//           style={{
//             position: 'absolute',
//             left: `${area.coords[0]}px`,
//             top: `${area.coords[1]}px`,
//             width: `${area.coords[2] - area.coords[0]}px`,
//             height: `${area.coords[3] - area.coords[1]}px`,
//             cursor: 'pointer',
//             transition: 'all 0.3s ease',
//           }}
//           title={area.title}
//           onClick={() => handleClick(area.href)}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
//             e.target.style.border = '2px solid rgba(255, 0, 0, 0.8)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = 'transparent';
//             e.target.style.border = 'none';
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default InteractiveImageMap;
// import React, { useState, useEffect, useRef } from 'react';

// const InteractiveImageMap = ({ imageBase64, clickableAreas, width }) => {
//   const [scale, setScale] = useState(1);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     if (imgRef.current) {
//       const naturalWidth = imgRef.current.naturalWidth;
//       setScale(width / naturalWidth);
//     }
//   }, [width]);

//   const handleClick = (href) => {
//     window.open(href, '_blank');
//   };

//   return (
//     <div style={{ position: 'relative', display: 'inline-block', width: `${width}px` }}>
//       <img
//         ref={imgRef}
//         src={`data:image/png;base64,${imageBase64}`}
//         alt="Interactive Map"
//         style={{ width: '100%', height: 'auto' }}
//       />
//       {clickableAreas.map((area, index) => (
//         <div
//           key={index}
//           style={{
//             position: 'absolute',
//             left: `${area.coords[0] * scale}px`,
//             top: `${area.coords[1] * scale}px`,
//             width: `${(area.coords[2] - area.coords[0]) * scale}px`,
//             height: `${(area.coords[3] - area.coords[1]) * scale}px`,
//             cursor: 'pointer',
//             transition: 'all 0.3s ease',
//           }}
//           title={area.title}
//           onClick={() => handleClick(area.href)}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
//             e.target.style.border = '2px solid rgba(255, 0, 0, 0.8)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = 'transparent';
//             e.target.style.border = 'none';
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default InteractiveImageMap;


import React, { useState, useEffect, useRef } from 'react';

const InteractiveImageMap = ({ imageBase64, clickableAreas, widthPercentage = 100 }) => {
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(0);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth * (widthPercentage / 100);
        setWidth(newWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [widthPercentage]);

  useEffect(() => {
    if (imgRef.current && width > 0) {
      const naturalWidth = imgRef.current.naturalWidth;
      setScale(width / naturalWidth);
    }
  }, [width]);

  const handleClick = (href) => {
    window.open(href, '_blank');
  };

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <div style={{ position: 'relative', display: 'inline-block', width: `${width}px` }}>
        <img
          ref={imgRef}
          src={`data:image/png;base64,${imageBase64}`}
          alt="Interactive Map"
          style={{ width: '100%', height: 'auto' ,zIndex: 1}}
        />
        {clickableAreas.map((area, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${area.coords[0] * scale}px`,
              top: `${area.coords[1] * scale}px`,
              width: `${(area.coords[2] - area.coords[0]) * scale}px`,
              height: `${(area.coords[3] - area.coords[1]) * scale}px`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            title={area.title}
            onClick={() => handleClick(area.href)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
              e.target.style.border = '2px solid rgba(255, 0, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.border = 'none';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveImageMap;