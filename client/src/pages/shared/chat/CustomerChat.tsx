/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');
export const CustomerChat = () => {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [agentAvailable, setAgentAvailable] = useState(false);
  const [messages, setMessages] = useState<string[]>();

  useEffect(() => {
    // Event handler when an agent is available in the room
    socket.on('agentAvailable', () => {
      setAgentAvailable(true);
    });

    // Event handler when a message is received from an agent
    socket.on('agentReceivedMessage', (agentReceivedMessage) => {
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { type: 'agent', message },
      // ]);

      setMessages((prevMessages) => prevMessages && [...prevMessages, agentReceivedMessage]);
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.off('agentAvailable');
      socket.off('agentReceivedMessage');
    };
  }, []);

  const handleJoinRoom = () => {
    // Replace 'customer123' with the actual customer ID or any identifier you want to use
    const customerId = 'customer123';
    socket.emit('joinRoom', roomId, customerId);
  };

  const handleSendMessage = () => {
    // Send the message to the room
    socket.emit('customerMessage', message, roomId);

    // Update the customer's own message locally
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { type: 'customer', message },
    // ]);

    setMessages((prevMessages) => prevMessages && [...prevMessages, message]);

    setMessage('');
  };

  return (
    <div>
      <h1>Customer Chat</h1>
      <input
        type='text'
        placeholder='Enter Room ID'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button type='button' onClick={handleJoinRoom}>
        Join Room
      </button>
      <br />
      {agentAvailable && <p>An agent is available in the room.</p>}
      <div>
        <ul>
          {messages?.map((msg, index) => (
            <li
              key={index}
              // style={{ color: msg.type === 'customer' ? 'blue' : 'green' }}
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
        <button type='button' onClick={handleSendMessage} disabled={!agentAvailable}>
          Send
        </button>
      </div>
    </div>
  );
};
