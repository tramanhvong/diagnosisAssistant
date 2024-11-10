import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './chat.module.css';

const ChatHistoryItem = ({ text }) => {
    return (
        <div className={styles.chat}>
            {text}
        </div>
    );
};

export default ChatHistoryItem;
