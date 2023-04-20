import React from 'react';
import BoyImg from '../assets/boy1.png';
import Image12 from '../assets/image12.png';
import Image13 from '../assets/image13.png';
import { Link } from 'react-router-dom';

export default function GetStarted() {
  return (
    <div className='bg-orange-set h-full flex flex-col'>
      <div className="font-exo-2 font-bold text-white text-center" style={{ fontSize: '65px' }}>
        <div className="leading-none">
          Food for Everyone
        </div>
      </div>
      <div className="flex justify-center items-end ">
        <div className="pb-16">
          <div className="flex-none">
            <img src={Image13} alt="not work" />
          </div>
          <div className="flex-none pt-20">
            <img src={Image12} alt="not work" />
          </div>
        </div>
        <div className="flex-none pt-20">
          <img src={BoyImg} alt="not work" />
        </div>
      </div>
      <div className='text-3xl justify-center items-center flex'>
        <Link to='/home'>
          <button className='bg-white text-orange-set rounded-3xl py-8 px-52 my-32'>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  )
}
