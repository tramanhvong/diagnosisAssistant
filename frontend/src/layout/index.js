import SideBar from '@/component/side-bar';
import React from 'react';

const LayoutSideBar = ({ children }) => {
  return (
    <div className='container-fluid p-0'>
      <div className='row g-0'>
        <div className='col-1 p-0'>
          <SideBar />
        </div>
        <div className='col-11 p-0'>{children}</div>
      </div>
    </div>
  );
};

export default LayoutSideBar;
