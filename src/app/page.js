"use client"
import React from 'react';
import MediaTest from '../../components/MediaTest';

const App = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col items-center w-full text-white'>
      <h1 className='text-[2rem] font-medium'>Media Picker</h1>
      <h3 className='text-[1rem] opacity-80'>Developed by @bytebigboss</h3>
      </div>
      <MediaTest />
    </div>
  );
};

export default App;
