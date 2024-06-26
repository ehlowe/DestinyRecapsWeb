import React, { useRef, useEffect } from 'react';

// import loadingGif from '../assets/loading-wtf.gif';
import transparentLoadingGif from '../assets/loading_transparent.gif';
const loadingGif=transparentLoadingGif;

//create style for .highlight

const TranscriptComponent = ({ meta, characterIndex }) => {
  const transcriptRef = useRef(null);
  const highlightClass = 'highlight';

  useEffect(() => {
    if (characterIndex !== null && transcriptRef.current) {
      scrollToCharacter();
    }
  }, [characterIndex]);

  const scrollToCharacter = () => {
    const transcriptDiv = transcriptRef.current;

    if (!transcriptDiv) {
      console.error('Transcript div not found.');
      return;
    }

    // Remove previous highlights
    const previouslyHighlighted = transcriptDiv.querySelectorAll(`.${highlightClass}`);
    previouslyHighlighted.forEach(el => el.classList.remove(highlightClass));

    let currentIndex = 0;
    let charCount = 0;
    let reachedEnd = false;

    function highlightWords(node) {
      if (reachedEnd) return;

      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
        let nodeLength = node.textContent.length;

        if (currentIndex + nodeLength >= characterIndex) {
          // Start highlighting from this node
          for (let i = 0; i < nodeLength; i++) {
            if (charCount >= 1000) {
              reachedEnd = true;
              return;
            }

            if (currentIndex + i >= characterIndex) {
              charCount++;
              node.classList.add(highlightClass);
            }
          }
        }

        currentIndex += nodeLength;
      } else {
        node.childNodes.forEach(child => highlightWords(child));
      }
    }

    highlightWords(transcriptDiv);

    const firstHighlighted = transcriptDiv.querySelector(`.${highlightClass}`);
    if (firstHighlighted) {
      firstHighlighted.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('Highlighted element not found.');
    }
  };

  return (
    <div className="meta-content" ref={transcriptRef}>
      <div className="meta-text">
        <div className="scrollable-content">
          {/* <img src={loadingGif} alt="loading"/> */}
        {/* <img src={loadingGif} alt="loading"/> */}
          {(meta.linked_transcript!=null)?<div id="linked-transcript" dangerouslySetInnerHTML={{ __html: meta.linked_transcript }} />:<img src={loadingGif} alt="loading"/>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TranscriptComponent);
