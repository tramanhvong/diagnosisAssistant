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

  return;
};

export default ChatPage;
