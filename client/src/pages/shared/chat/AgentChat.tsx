/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

export const AgentChat = () => {
  const [roomId, setRoomId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>();

  useEffect(() => {
    // Event handler when a message is received from the selected customer
    socket.on('customerReceivedMessage', (customerReceivedMessage) => {
      setMessages((prevMessages) => prevMessages && [...prevMessages, customerReceivedMessage]);
    });

    return () => {
      // Clean up event listener when component unmounts
      socket.off('customerReceivedMessage');
    };
  }, []);

  const handleSendMessage = () => {
    // Send the message to the room and the selected customer
    socket.emit('agentMessage', message, roomId, customerId);

    // Update the agent's own message locally
    setMessages((prevMessages) => prevMessages && [...prevMessages, message]);
    setMessage('');
  };

  return (
    <div>
      <h1>Agent Chat</h1>
      <input
        type='text'
        placeholder='Enter Room ID'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter Customer ID'
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <br />
      <div>
        <ul>
          {messages?.map((msg, index) => (
            <li
              key={index}
              // style={{ color: msg?.type === 'agent' ? 'green' : 'blue' }}
            >
              {msg}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type='text'
          placeholder='Type your message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='button' onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};
