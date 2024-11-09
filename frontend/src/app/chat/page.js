'use client';
import React, { useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    setInput(''); // Clear input

    try {
      const response = await axios.post('/api/chat', { message: input });
      const assistantMessage = {
        role: 'assistant',
        content: response.data.message,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div
            className='chat-box'
            style={{
              height: '70vh',
              overflowY: 'scroll',
              padding: '1rem',
              border: '1px solid #ddd',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.role === 'user' ? 'text-end' : 'text-start'
                }`}
                style={{
                  margin: '0.5rem 0',
                  padding: '0.5rem',
                  background: msg.role === 'user' ? '#dcf8c6' : '#f1f0f0',
                  borderRadius: '8px',
                  maxWidth: '70%',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>
        <div className='col-12 d-flex mt-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Type a message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className='btn btn-primary ms-2' onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
