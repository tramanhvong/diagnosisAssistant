import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ChatPage = () => {
  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        {/* Sidebar */}
        <div className='col-2 bg-light d-flex flex-column p-3'>
          <h4 className='mb-4'>Favorites</h4>
          <ul className='list-unstyled'>
            <li className='mb-3'>
              <i className='bi bi-file-text me-2'></i>Technical Docs
            </li>
            <li className='mb-3'>
              <i className='bi bi-flag me-2'></i>Campaign Guidelines
            </li>
            <li className='mb-3'>
              <i className='bi bi-star me-2'></i>Important Rules
            </li>
            <li className='mb-4'>
              <i className='bi bi-info-circle me-2'></i>Onboarding
            </li>
          </ul>
          <h4 className='mb-4'>Main Menu</h4>
          <ul className='list-unstyled'>
            <li className='mb-3'>
              <i className='bi bi-house-door me-2'></i>Dashboard
            </li>
            <li className='mb-3'>
              <i className='bi bi-megaphone me-2'></i>Campaigns
            </li>
            <li className='mb-3 active'>
              <i className='bi bi-chat me-2'></i>Messages
            </li>
            <li className='mb-3'>
              <i className='bi bi-headset me-2'></i>Support Center
            </li>
            <li className='mb-3'>
              <i className='bi bi-person me-2'></i>Leads
            </li>
            <li className='mb-3'>
              <i className='bi bi-archive me-2'></i>Archive
            </li>
          </ul>
          <button className='btn btn-light border mt-auto p-2'>
            <i className='bi bi-download me-2'></i> Get the extension
          </button>
        </div>

        {/* Chat List */}
        <div className='col-3 border-end d-flex flex-column p-3'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h5>Messages</h5>
            <button className='btn btn-primary btn-sm'>New Message</button>
          </div>
          <div className='mb-4'>
            <h6 className='text-muted'>Channels</h6>
            <p>Direct Messages</p>
          </div>
          <ul
            className='list-unstyled overflow-auto'
            style={{ maxHeight: '70vh' }}
          >
            <li className='d-flex align-items-center p-2 mb-2'>
              <img
                src='/path/to/avatar.jpg'
                alt='avatar'
                className='rounded-circle me-2'
                width='40'
                height='40'
              />
              <span>Ethan Anderson</span>
            </li>
            <li className='d-flex align-items-center p-2 mb-2 bg-light rounded'>
              <img
                src='/path/to/avatar.jpg'
                alt='avatar'
                className='rounded-circle me-2'
                width='40'
                height='40'
              />
              <span>Noah Martinez</span>
            </li>
            {/* Add more direct messages as needed */}
          </ul>
        </div>

        {/* Main Chat Area */}
        <div className='col-7 d-flex flex-column p-3'>
          <div className='border-bottom pb-2 mb-3 d-flex justify-content-between align-items-center'>
            <h5>Chat with Noah Martinez</h5>
            <input
              type='text'
              className='form-control w-25'
              placeholder='Search'
            />
          </div>
          <div
            className='flex-grow-1 overflow-auto mb-3'
            style={{ maxHeight: '60vh' }}
          >
            <div className='d-flex flex-column'>
              {/* Sample messages */}
              <div className='d-flex mb-3'>
                <img
                  src='/path/to/avatar.jpg'
                  alt='avatar'
                  className='rounded-circle me-2'
                  width='40'
                  height='40'
                />
                <div className='bg-light p-3 rounded'>
                  <strong>Noah Martinez</strong>
                  <p className='mb-0'>Hey Amanda, are you around? 😊</p>
                  <small className='text-muted'>09:03 AM</small>
                </div>
              </div>
              <div className='d-flex justify-content-end mb-3'>
                <div
                  className='bg-primary text-white p-3 rounded'
                  style={{ maxWidth: '70%' }}
                >
                  <p className='mb-0'>Hey 👋 What’s up?</p>
                  <small className='text-muted'>09:03 AM</small>
                </div>
              </div>
              {/* Add more messages as needed */}
            </div>
          </div>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Message Noah Martinez'
            />
            <button className='btn btn-primary'>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
