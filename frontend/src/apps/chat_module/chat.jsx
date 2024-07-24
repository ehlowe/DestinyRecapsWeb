










// import React, { useState, useRef, useEffect } from 'react';
// import styles from "./chat.module.css";

// const ChatComponent = ({ urlPath, videoId }) => {
//   const [messages, setMessages] = useState([
//     { role: 'assistant', content: 'Whatsup' },
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesContainerRef = useRef(null);

//   const scrollToBottom = () => {
//     if (messagesContainerRef.current) {
//       const { scrollHeight, clientHeight } = messagesContainerRef.current;
//       messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
//     }
//   };

//   useEffect(scrollToBottom, [messages]);

//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const newMessages = [
//       ...messages,
//       { role: 'user', content: inputMessage }
//     ];

//     setMessages(newMessages);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(urlPath+`?pin=194&video_id=${videoId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newMessages),
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setMessages([...newMessages, data]);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetChat = () => {
//     setMessages([
//       { role: 'assistant', content: 'Whatsup' },
//     ]);
//     setInputMessage('');
//   };

//   return (
//     <div className={styles['chat-container']}>
//       <h2 className={styles['chat-title']}>GPT-Tiny</h2>
//       <div className={styles['messages-container']} ref={messagesContainerRef}>
//         {messages.map((message, index) => (
//           <div key={index} className={`${styles.message} ${styles[`message-${message.role}`]}`}>
//             <div className={styles['message-content']}>
//               {message.content}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className={styles['input-container']}>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           placeholder="Type your message..."
//           disabled={isLoading}
//           className={styles['chat-input']}
//         />
//         <button 
//           onClick={sendMessage} 
//           disabled={isLoading}
//           className={styles['send-button']}
//         >
//           Send
//         </button>
//         <button 
//           onClick={resetChat}
//           className={styles['reset-button']}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;











import React, { useState, useRef, useEffect } from 'react';
import styles from "./chat.module.css";

const ChatComponent = ({ urlPath, videoId }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Whatsup' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: inputMessage }
    ];

    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(urlPath+`?pin=194&video_id=${videoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessages),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages([...newMessages, data]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      { role: 'assistant', content: 'Whatsup' },
    ]);
    setInputMessage('');
  };

  const renderMessageContent = (content) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split the content by URLs
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        // If the part is a URL, render it as a link
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['message-link']}
          >
            {part}
          </a>
        );
      }
      // Otherwise, render it as plain text
      return part;
    });
  };

  return (
    <div className={styles['chat-container']}>
      <h2 className={styles['chat-title']}>GPT-Tiny</h2>
      <div className={styles['messages-container']} ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[`message-${message.role}`]}`}>
            <div className={styles['message-content']}>
              {renderMessageContent(message.content)}
            </div>
          </div>
        ))}
      </div>
      <div className={styles['input-container']}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
          className={styles['chat-input']}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading}
          className={styles['send-button']}
        >
          Send
        </button>
        <button 
          onClick={resetChat}
          className={styles['reset-button']}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;