'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ChatHistoryItem from '@/component/Chat/chat-history-item';
import InputField from '@/component/InputField/input-field';

const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const chatHistory = [
    {
      id: 1,
      title: 'Diabetes',
      text: 'Hey Amanda, are you around? 😊',
      sender: 'Noah Martinez',
      timestamp: '09:03 AM',
    },
    {
      id: 2,
      title: 'Flu',
      text: 'Hey 👋 What’s up?',
      sender: 'Amanda',
      timestamp: '09:03 AM',
    },
  ];
  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        {/* Sidebar */}
        <div className='col-2 bg-light d-flex flex-column p-3'>
          <h4 className='mb-4'>History</h4>
          <ul className='list-unstyled'>
            {chatHistory.map((chat) => (
              <li key={chat.id} className='mb-3'>
                <ChatHistoryItem text={chat.title} />
              </li>
            ))}
          </ul>
        </div>

        {/* Main Chat Area */}
        <div className='col-10 d-flex flex-column p-3'>
          <div className='border-bottom pb-2 mb-3 d-flex justify-content-between align-items-center'>
            <h5>Ask Doktor</h5>
          </div>
          <div
            className='flex-grow-1 overflow-auto mb-3'
            style={{ maxHeight: '60vh' }}
          >
            <div className='d-flex flex-column'>
              {/* Sample messages */}
              <div className='d-flex mb-3'>
                <div className='bg-light p-3 rounded'>
                  <p className='mb-0'>MODEL ANSWER GOES HERE</p>
                </div>
              </div>
              <div className='d-flex justify-content-end mb-3'>
                <div
                  className='bg-primary text-white p-3 rounded'
                  style={{ maxWidth: '70%' }}
                >
                  <p className='mb-0'>Hey 👋 What’s up?</p>
                </div>
              </div>
              {/* Add more messages as needed */}
            </div>
          </div>
          <div className='input-group'>
            <InputField
              placeholder='Type your message here'
              inputText={inputText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
