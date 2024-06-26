import React, { useState } from 'react';


import './recap.css';


const Recap = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFullContent = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    const multiline_string=`- Historical context of the conflict, including the 1948 Arab-Israeli War and the Nakba
   - Discussion of Israel's occupation of the West Bank and Gaza since 1967
   - Debates about Israel's democratic status and treatment of Palestinians
   - Analysis of the 1947 UN Partition Plan and subsequent wars
   - Israel's 2005 disengagement from Gaza and its consequences
   - Hamas and its role in the conflict
   - Recent events, including the October 7th Hamas attack on Israel
   - Debates about the proportionality of Israel's military responses`;

    // const topics = [
    //     {
    //         title: "1. Israel-Palestine Conflict",
    //         summary: multiline_string,
    //         content: "Cars are a mode of transportation with four wheels. They are used for personal and commercial transportation. They come in various types such as sedans, SUVs, and trucks, and can be powered by gasoline, electricity, or hybrid systems. Cars have a significant impact on our daily lives and are a crucial part of modern society. They offer flexibility and convenience for traveling short and long distances."
    //     },
    //     {
    //         title: "Bikes",
    //         summary: "A quick summary about bikes.",
    //         content: "Bikes are two-wheeled vehicles that are often human-powered through pedaling. They are commonly used for exercise, commuting, and recreation. Bikes come in various styles such as road bikes, mountain bikes, and hybrid bikes, each designed for specific terrains and purposes. They are eco-friendly and promote healthy living by encouraging physical activity. Biking can be an enjoyable and efficient way to navigate both urban and rural environments."
    //     }
    // ];

    const topics=[{'title': '1. Content Creation and Streaming',
        'content': "<ul><li>Twitch and streaming: Destiny expresses frustration with Twitch, criticizing the current state of political content on the platform</li><li>Relationships with other streamers: Mentions being on good terms with several Twitch streamers</li><li>Kit (streaming platform): Discusses Kit's potential to compete with Twitch</li><li>Collaboration with other creators: Expresses reluctance due to differences in approach and audience expectations</li></ul>",
        'zoom': "Destiny discusses various aspects of his content creation and streaming activities. He expresses frustration with the current state of political content on Twitch, which he sees as less collaborative and more focused on individual streamers' clout. Destiny mentions being on good terms with several other Twitch streamers, but emphasizes that he doesn't want blind defense from others, just fair treatment and acknowledgment when he's correct. He briefly discusses the potential of the streaming platform Kit to compete with Twitch, expressing uncertainty about its ability to overcome Twitch's established advantage. The speaker also discusses collaborating with other content creators, expressing reluctance due to differences in approach and audience expectations."},
       {'title': '2. Political Commentary and Debates',
        'content': '<ul><li>Criticism of political commentators: Particularly those who made incorrect predictions about COVID-19</li><li>Discussion of political extremes: Potential for extremes to work together, drawing parallels to historical events</li><li>Science and politics: Criticizes misrepresentation of scientific facts for political purposes</li><li>Israel-Palestine conflict: References to debates and discussions on this topic</li></ul>',
        'zoom': 'Destiny engages in substantive political commentary and debates, critiquing the actions and rhetoric of various political figures and commentators. He discusses the potential for political extremes to collaborate, drawing historical parallels, and emphasizes the importance of accurately representing scientific facts in political discourse. Destiny also references a debate or discussion regarding the complex Israel-Palestine conflict, where someone challenges his knowledge on the topic. Throughout these discussions, Destiny demonstrates a nuanced understanding of political dynamics and a willingness to engage with differing perspectives, while maintaining a critical eye towards those he believes are misrepresenting information or acting in bad faith.'},
       {'title': '3. Technical Issues and Discussions',
        'content': '<ul><li>Video file management: Issues with large video files and potential solutions</li><li>Russian bot operation analysis: In-depth discussion of a potential Russian bot operation on Twitter, focusing on error messages and technical aspects</li></ul>',
        'zoom': 'Destiny discusses technical issues related to managing large video files from his cameras, exploring options for compressing or handling these files to send to his editor in Australia. He delves into specifics about file sizes, upload speeds, and potential solutions. Additionally, Destiny takes a skeptical and analytical approach when examining the reported Russian bot operation exposed on Twitter, questioning the technical feasibility of the error message described and breaking down how a Twitter bot using ChatGPT might realistically function, noting that the reported error does not align with typical programming practices.'},
       {'title': '4. Personal Life and Relationships',
        'content': '<ul><li>Work-life balance: Discusses the relationship between career success and personal life</li><li>Relationship discussions: Comments on breakups and relationship dynamics</li></ul>',
        'zoom': "Destiny discusses the delicate balance between career success and personal life, noting that the most successful people often struggle to maintain a healthy work-life balance. He suggests there is a tipping point where an excessive focus on work can come at the expense of one's personal relationships and commitments. This is exemplified in the breakup explanation Destiny reads, where the individual acknowledges that their unwillingness to compromise and support their partner's needs ultimately led to the demise of the relationship, despite their partner's efforts to accommodate the career-focused dynamic. Destiny's commentary highlights the challenges of maintaining fulfilling personal connections while pursuing ambitious professional goals, underscoring the importance of finding a sustainable equilibrium between the two."},
       {'title': 'Upcoming events and travel plans',
        'zoom': "Destiny mentions that he has some upcoming travel plans and events. He states that he is going to talk to Alex O'Connor tomorrow, and he thinks he will not be streaming at all that day. Destiny also notes that on the 25th, he is going to LA for an event, though he doesn't provide any additional details about it. Overall, Destiny seems a bit overwhelmed by his busy schedule and the various obligations he has in the near future."},
       {'title': 'Typing speed and tests',
        'zoom': 'Destiny discusses his typing speed, noting that he can achieve over 160 words per minute on certain typing tests, depending on the specific test used. He mentions that the verification tests often rate him unusually high, resulting in inflated speed scores. Destiny acknowledges that his actual typing speed can vary depending on the test, but he is confident he can exceed 160 words per minute when given the right test conditions. He seems to take pride in his typing abilities and is willing to put them to the test, even offering a donation if his speed exceeds a certain threshold.'},
       {'title': 'Current events (e.g., protest group damaging Stonehenge)',
        'zoom': 'Here is a 0 fluff, 0 emotion, 0 opinion paragraph on the current event of a protest group damaging Stonehenge:\n\nAccording to the transcript, a protest group recently damaged the historic site of Stonehenge by spray painting it orange. The transcript states that "some stopped oil group just damaged Stonehenge. Didn\'t they try to sit on a fire? Can you really set stones on fire? No, they used paint to damage it. They spray painted it orange."'},
       {'title': 'Personal stance on issues and desire for fair treatment in online discourse',
        'zoom': 'Destiny emphasizes that he speaks out on issues he believes are correct, not to defend specific groups or individuals. He expresses discomfort with being seen as a spokesperson for any particular cause, stating that he just wants to be able to voice his views without facing personal attacks or death threats, and for people to engage with the substance of his arguments rather than attacking him based on who he is. Destiny is open to being challenged or corrected if he is wrong about something, but he wants online discourse to focus on the merits of the arguments rather than devolving into personal attacks or threats.'},
       {'title': 'Mental state and need for emotional organization',
        'zoom': 'He states that his "brain is like fucked" and that he has been "kind of fucked for a few weeks." He expresses a need to "organize [his] shit emotionally or mentally" and to "orient [himself] in this space more" given that he has now participated in "large debates" and gained "mainstream credibility" that he wants to "start aggressively leveraging." He acknowledges that his current mental state is causing him frustration and irritation, and he seems to recognize the need to address this in order to engage more effectively.'},
       {'title': 'Brief mentions of historical atrocities (Holocaust, Holodomor, Great Leap Forward)',
        'zoom': 'The transcript includes brief mentions of historical atrocities such as the Holocaust, the Holodomor, and the Great Leap Forward. Destiny questions whether the Soviet Union was truly incapable of committing a Holocaust-level atrocity, noting that the Great Leap Forward resulted in the deaths of over 30 million people. He also references the Holodomor, the Soviet-era famine in Ukraine that killed an estimated 22,000 Polish military officers. These references to major historical tragedies are used to draw parallels and raise questions about the capacity for large-scale violence and repression under different political ideologies.'},
       {'title': 'Music and cultural gatekeeping',
        'zoom': 'Music and cultural gatekeeping: Destiny watches and comments on a video about friends discussing music knowledge and cultural gatekeeping. The video touches on themes of authenticity, algorithm-driven recommendations, and personal choices in music and fashion. One friend accuses the other of being a "gatekeeper" who only appreciates music he has "put in the work" to discover, rather than relying on algorithmic recommendations. This leads to a debate about the merits of discovering music organically versus passively consuming what is algorithmically suggested, and whether true musical appreciation requires active curation and effort. The discussion highlights the tension between individual musical preferences and the influence of external forces in shaping cultural tastes and identities.'},
       {'title': 'January 6th event',
        'zoom': 'The transcript does not contain a substantive discussion about the January 6th event. The only reference is a brief, sarcastic remark about whether the speaker\'s "January 6 toate" required them to wear black clothes. There is no detailed information or analysis provided about the January 6th event itself.'},
       {'title': 'Merchandise promotion',
        'zoom': 'The transcript includes a brief section promoting merchandise and a beer brand. Destiny mentions that the "best way to support us" is to visit the Fridaybeers shop and check out their "cool collection of t-shirts", noting that a new shirt is dropping that week. He encourages viewers to click the link and purchase the merchandise to support the creators.'},
       {'title': 'YouTube drama',
        'zoom': 'The transcript discusses various topics, including a potential debate with Brett Cooper from the Daily Wire, as well as some commentary on recent YouTube drama. The speaker seems hesitant to dive too deeply into the YouTube drama, stating that they "don\'t really want to do dive into this much because it\'s gonna make me seem whatever." They acknowledge that while some of the comments made may have been "legitimately being like evil, terrible, horrible people, or like doing fucked up shit," the overall situation doesn\'t seem to concern them greatly. The speaker appears more interested in the potential debate opportunity, but also notes that they\'re not entirely sure what they would argue about, given Cooper\'s young age. The discussion of YouTube drama and potential debates appears to be brief mentions within a broader conversation.'},
       {'title': 'News story about a 12-year-old Jewish girl in Paris',
        'zoom': 'According to the transcript, a news story was discussed about a 12-year-old Jewish girl who was gang-raped in Paris in an apparent anti-Semitic attack. The speaker expressed confusion and frustration, questioning the newsworthiness of the story and noting that the article provided little information about the perpetrators or the details of the attack. The speaker remarked that the article seemed "kind of fucked up" and wondered how 12-year-olds could have the mindset to commit such an act, while also cautioning against making assumptions about the perpetrators\' identities or backgrounds without more information.'},
       {'title': 'Cocaine-related incident involving a 9-year-old',
        'zoom': 'A 9-year-old child tested positive for high levels of cocaine, according to reports. The details surrounding this incident are unclear, but the discovery of a young child with such a concerning substance in their system is deeply troubling. While the specifics of the case are not fully known, this situation highlights the need for greater awareness and prevention efforts to protect vulnerable children from the dangers of drug abuse.'},
       {'title': "Qatar's relationship with Hamas and Al Jazeera",
        'zoom': "Qatar has long been accused of supporting the Palestinian militant group Hamas, providing a safe haven for its leadership and funding its activities. Al Jazeera, the Qatari state-owned media network, has also been criticized for its perceived bias in favor of Hamas and its coverage of the Israeli-Palestinian conflict. Qatar's close ties with Hamas, which is designated as a terrorist organization by many countries, have been a source of tension in the region and have drawn criticism from Israel and its allies. Despite these allegations, Qatar has maintained that its support for Hamas is part of its broader policy of engagement with all Palestinian factions in an effort to promote a peaceful resolution to the conflict."},
       {'title': "Douglas Murray's comments on Israel-Hamas conflict",
        'zoom': 'Douglas Murray criticized the media\'s response to the Israel-Hamas conflict, noting that there was an "outpouring of rage" against Israel rather than the "Islamic revolutionary government in Tehran." He pointed out the lack of an international campaign to "bring back our Jewish children" compared to the "Bring back our girls" campaign during the war in northern Nigeria. Murray suggested that the media\'s coverage and public reaction were biased, failing to address the role of Hamas and its funding and hosting by Qatar.'},
       {'title': 'Age of consent laws and pedophilia (mentioned in confusion)',
        'zoom': 'Hasan made a confusing reference to people who "will defend the arbitrary nature of age of consent laws and how they should be abolished or whatever. Or how it\'s actually not pedophilia." Destiny seems perplexed by this, wondering if Hasan is implying that Destiny himself has made such claims, or if Hasan is referring to some other unspecified content creators. Destiny states he has no idea where this strange accusation is coming from, and wonders if Hasan is "projecting his own desires to fuck teenagers" onto him. Overall, Destiny appears bewildered by Hasan\'s unexpected comments about age of consent laws and pedophilia, unsure of the context or who exactly Hasan is targeting with these remarks.'},
       {'title': 'Illegal firearm modifications',
        'zoom': 'The transcript discusses the use of illegal firearm modifications, specifically the installation of "switches" on Glock handguns to make them fully automatic. The speaker acknowledges that these modifications are illegal and that anyone who attempts to install them would face serious legal consequences, stating "if you have a switch on your Glock, don\'t comment down below because you will go to jail." The discussion highlights the dangers and legal implications of tampering with firearms in this manner, emphasizing the importance of responsible and lawful firearm ownership and use.'}];

    return (
        <div className="recap-div">
            {topics.map((topic, index) => (
                <div
                    key={index}
                    className={`dropdown-container ${activeIndex === index ? 'clicked' : ''}`}
                    onClick={() => toggleFullContent(index)}
                >
                    <div className="dropdown-title">
                        {topic.title}
                    </div>
                    {/* {(topic.content!=null)?<div className="dropdown-info">
                        {topic.summary}
                    </div>:null} */}
                    <div className="dropdown-info" dangerouslySetInnerHTML={{ __html : topic.content }}>
                        {/* {dangerouslySetInnerHTML={{ __html : topic.content }}} */}
                        {/* {__html: topic.content} */}
                    </div>


                    <div className={`dropdown-content ${activeIndex === index ? 'visible' : ''}`}>
                        <p>{topic.zoom}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
//     const [activeIndex, setActiveIndex] = useState(null);

//     const toggleFullContent = (index) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     const topics = [
//         {
//             title: "Cars",
//             summary: "A quick summary about cars.",
//             content: "Cars are a mode of transportation with four wheels. They are used for personal and commercial transportation. They come in various types such as sedans, SUVs, and trucks, and can be powered by gasoline, electricity, or hybrid systems. Cars have a significant impact on our daily lives and are a crucial part of modern society. They offer flexibility and convenience for traveling short and long distances."
//         },
//         {
//             title: "Bikes",
//             summary: "A quick summary about bikes.",
//             content: "Bikes are two-wheeled vehicles that are often human-powered through pedaling. They are commonly used for exercise, commuting, and recreation. Bikes come in various styles such as road bikes, mountain bikes, and hybrid bikes, each designed for specific terrains and purposes. They are eco-friendly and promote healthy living by encouraging physical activity. Biking can be an enjoyable and efficient way to navigate both urban and rural environments."
//         }
//     ];

//     return (
//         <div style={styles.body}>
//             {topics.map((topic, index) => (
//                 <div
//                     key={index}
//                     className={`dropdown-container ${activeIndex === index ? 'clicked' : ''}`}
//                     onClick={() => toggleFullContent(index)}
//                     style={{
//                         ...styles.dropdownContainer,
//                         ...(activeIndex === index ? styles.clicked : {})
//                     }}
//                 >
//                     <div className="dropdown-title" style={styles.dropdownTitle}>
//                         Title: {topic.title}
//                     </div>
//                     <div className="dropdown-info" style={styles.dropdownInfo}>
//                         {topic.summary}
//                     </div>
//                     <div
//                         className="dropdown-content"
//                         style={{
//                             ...styles.dropdownContent,
//                             ...(activeIndex === index ? styles.dropdownContentVisible : {})
//                         }}
//                     >
//                         <p>{topic.content}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

const styles = {
    // body: {
    //     backgroundColor: '#191970',
    //     color: 'white',
    //     fontFamily: 'Arial, sans-serif',
    //     margin: 0,
    //     padding: 0,
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // dropdownContainer: {
    //     width: '300px',
    //     margin: '20px',
    //     border: '1px solid #ccc',
    //     borderRadius: '5px',
    //     backgroundColor: '#191970',
    //     position: 'relative',
    //     transition: 'max-height 0.3s ease',
    //     maxHeight: '75px',
    //     overflow: 'hidden',
    //     cursor: 'pointer',
    // },
    // dropdownTitle: {
    //     padding: '5px 10px',
    //     borderBottom: '1px solid #ccc',
    //     backgroundColor: '#1c1c8c',
    //     margin: 0,
    // },
    // dropdownInfo: {
    //     padding: '5px 10px',
    //     backgroundColor: '#1c1c8c',
    //     borderBottom: '1px solid #ccc',
    //     margin: 0,
    //     lineHeight: 1.4,
    // },
    // dropdownContent: {
    //     backgroundColor: '#1c1c8c',
    //     margin: 0,
    //     lineHeight: 1.4,
    //     visibility: 'hidden',
    //     opacity: 0,
    //     height: 0,
    //     transition: 'visibility 0s, opacity 0.3s linear, height 0.3s ease',
    // },
    // dropdownContentVisible: {
    //     visibility: 'visible',
    //     opacity: 1,
    //     height: 'auto',
    // },
    // clicked: {
    //     maxHeight: '1000px',
    // },
};
export default Recap;

