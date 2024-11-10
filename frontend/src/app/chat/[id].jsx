'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ChatHeader from '@/component/Chat/chat-header';
import ChatMessage from '@/component/Chat/chat-message';
import InputField from '@/component/InputField/input-field';
import { useRouter } from 'next/router';

const LOCALHOST_URL = process.env.LOCALHOST_URL;

const ChatDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = (message) => {
        try {
            const response = fetch(`${LOCALHOST_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });
            if (response.status === 201) {
                fetchChatHistory();
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    //fetch chat history from the server
    const fetchChatHistory = async () => {
        try {
            const response = await fetch(`${LOCALHOST_URL}/${id}`);
            const data = await response.json();
            setChatHistory(data);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    //fetch chat messages from the server
    const fetchChatMessages = async (id) => {
        try {
            const response = await fetch(`${LOCALHOST_URL}/chat/${id}`);
            const data = await response.json();
            setChatHistory(data);
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };

    //fetch chat history when the component mounts
    useEffect(() => {
        fetchChatHistory();
    }, []);

    return (
        <div className='container-fluid'>
            <div className='row vh-100'>
                {/* Sidebar */}
                <div className='col-2 bg-light d-flex flex-column p-3'>
                    <h4 className='mb-4'>History</h4>
                    <ul className='list-unstyled'>
                        {chatHistory.map((chat) => (
                            <li key={chat.id} className='mb-3'>
                                {/* Add more items as needed */}
                                <p>{chat.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Chat Area */}
                <div className='col-10 d-flex flex-column p-3'>
                    <ChatHeader />
                    <div
                        className='flex-grow-1 overflow-auto mb-3'
                        style={{ maxHeight: '60vh' }}
                    >
                        <div className='d-flex flex-column'>
                            {chatHistory.map((chat) => (
                                <ChatMessage
                                    key={chat.id}
                                    text={chat.text}
                                    isUser={chat.isUser}
                                />
                            ))}
                        </div>
                    </div>
                    <InputField onSend={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default ChatDetailPage;
