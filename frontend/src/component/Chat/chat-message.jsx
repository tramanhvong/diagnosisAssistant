import React from 'react';

const ChatMessage = ({ text, isUser }) => {
    return (
        <div className={`d-flex ${isUser ? 'justify-content-end' : ''} mb-3`}>
            <div className={`p-3 rounded ${isUser ? 'bg-primary text-white' : 'bg-light'}`} style={{ maxWidth: '70%' }}>
                <p style={{ whiteSpace: 'pre-line' }}>{text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
