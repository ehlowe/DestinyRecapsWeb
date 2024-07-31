import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataDrivenVisualization from '../stream_plot/sp';

const Backend = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('video_id');
    const p = searchParams.get('p', null);
    const [slowDetails, setSlowDetails] = useState(null);
    const svgContainerRef = useRef(null);

    useEffect(() => {
        fetch('/api/slow_recap_details?video_id=' + videoId)
            .then(response => response.json())
            .then(data => {
                setSlowDetails(data);
                console.log("Loaded slow recap details");
            })
            .catch(error => console.error('Error fetching slow recap:', error));
    }, [videoId]);

    const sendPngToBackend = async (pngDataUrl) => {
        try {
            const response = await fetch('/api/save_png', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'mra': p,
                    'video_id': videoId,
                    'image': JSON.stringify({ pngDataUrl }),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to save PNG');
            }
            console.log('PNG saved successfully');
        } catch (error) {
            console.error('Error saving PNG:', error);
        }
    };

    const captureSvgAsPng = () => {
        const svgElement = svgContainerRef.current.querySelector('svg');
        if (!svgElement) {
            console.error('SVG element not found');
            return;
        }

        // Get the SVG's viewBox dimensions
        const viewBox = svgElement.viewBox.baseVal;
        const svgWidth = viewBox.width;
        const svgHeight = viewBox.height;

        // Set desired output dimensions (adjust these as needed)
        const outputWidth = 1080;  // Example: Full HD width
        const outputHeight = 1080; // Example: Full HD height

        // Calculate scaling factors
        const scaleX = outputWidth / svgWidth;
        const scaleY = outputHeight / svgHeight;
        const scale = Math.min(scaleX, scaleY);

        // Calculate dimensions to maintain aspect ratio
        const scaledWidth = svgWidth * scale;
        const scaledHeight = svgHeight * scale;

        // Create a canvas with the output dimensions
        const canvas = document.createElement('canvas');
        canvas.width = outputWidth;
        canvas.height = outputHeight;

        const ctx = canvas.getContext('2d');
        
        // Clear the canvas with a white background
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center the SVG on the canvas
        const x = (outputWidth - scaledWidth) / 2;
        const y = (outputHeight - scaledHeight) / 2;

        // Convert SVG to data URL
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
            const pngDataUrl = canvas.toDataURL('image/png');
            sendPngToBackend(pngDataUrl);
        };
        img.src = svgUrl;
    };

    useEffect(() => {
        if (slowDetails) {
            // Increased timeout to ensure SVG is fully rendered
            setTimeout(captureSvgAsPng, 500);
        }
    }, [slowDetails]);

    return (
        <div ref={svgContainerRef} style={{ width: '100%', height: '100%' }}>
            {slowDetails && (
                <div className="data-driven-visualization" style={{ width: '100%', height: '100%' }}>
                    <DataDrivenVisualization plotData={slowDetails} />
                </div>
            )}
        </div>
    );
};

export default Backend;