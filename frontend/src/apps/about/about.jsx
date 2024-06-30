import React, { useState, useEffect, useRef, useCallback  } from 'react';

import './about.css';

const essay = `Status Quo:     
The vast majority of consumed media content comes from a small slice of the content available and usually in a fashion to maximize consumption. If this wasn't the case, with current systems, the content provided would be far less attractive or useful.

Problems:       
This feeding method causes two big issues: you lose the context on most of what is happening and your time is being governed by a filter that doesn't care about you or understand what you would say you want. This isn't the case for all media but it is the current paradigm, the algorithms only understand and care about what you do.

Solution:
Can a system be built to present a condensed version of a longer context, so that someone could grab the gist and guide themselves toward their interest if any from the content? Would that be valuable and or fix some of the current issues?`;


import imagePath from '../../assets/transparent_destinyrecaps.png';

const about_html=`
<br><br>
<h3>Links and Other Info</h3>
GIthub: 
<br>-    backend server <a href=https://github.com/ehlowe/DestinyRecapsApi>https://github.com/ehlowe/DestinyRecapsApi</a>
<br>-    frontend <a href=https://github.com/ehlowe/DestinyRecapsWeb>https://github.com/ehlowe/DestinyRecapsWeb</a>
<br>
<br>
Twitter: <a href=https://twitter.com/zapperstrudel>https://twitter.com/zapperstrudel</a>

<br>
The Discord: <a href=https://discord.gg/ycWjsRjt>https://discord.gg/ycWjsRjt</a>
<br>
My Discord: complicatedbananas9984

<br>
<br>



<h3>Feature Ideas</h3>
1. Create dropdowns for more details on items in the recap
<br>
2. Pull in data from more sources like https://drive.google.com/drive/folders/1aRv251i5bZIk223SDssmdvksKvrEYHdK 
<br>
2. Search across all streams instead of just one
<br>
3. Process dgg chat message
<br>

<br>
<h3>Current Features</h3>
- Discord recap message of each stream<br>
- Word level hyperlinked and diarized transcript<br>
- Embedding Search for transcript<br>

<br>
If you have feedback, ideas, or are interested in talking let me know, best place to reach me is on the discord.
`;

const About = () => {
    return (
        <div className="base-div" style={{backgroundImage: "url(../assets/ai_upscale_destinyrecaps6.png)",  backgroundRepeat: 'no-repeat',
            width:'250px' }}>
            <div>
                <div className="introduction-div">
                    {essay}
                </div>
                <div className="about-html" dangerouslySetInnerHTML={{__html: about_html}}>
                </div>
            </div>
            <div className="img-div">
                <img
                    className="img"
                    src={imagePath}
                    alt="information flow graph"
                />
            </div>
        </div>
    );

}


export default About;