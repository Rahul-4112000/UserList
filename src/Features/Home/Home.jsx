import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const activeUser = useSelector((state) => state.credential);
  return (
    <div className='text-center flex flex-col gap-8 mt-20'>
      <h1 className='text-4xl font-semibold font-roboto'>Welcome {activeUser?.fullName}</h1>
      <p className='font-semibold'>
        Your email is <span className='text-lg font-roboto'>{activeUser?.email}</span>
      </p>
    </div>
  );
};

export default Home;
