import React, { useState } from 'react';
import noInternetImg from '../assets/nointernet.png';

export default function NoInternet() {
  const [isConnected, setIsConnected] = useState(true);

  const handleClick = () => {
    // Simulating reconnect logic with a delay of 2 seconds
    setIsConnected(false);
    setTimeout(() => {
      setIsConnected(true);
    }, 2000);
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="flex justify-center items-center mb-6">
          <img src={noInternetImg} alt="No Internet Connection" className="w-48 h-48" />
        </div>
        <div className="font-bold text-3xl mb-4">
          No Internet Connection
        </div>
        <div className="text-gray-600 mb-8">
          Your internet connection is currently not available. Please check your connection or try again later.
        </div>
        <div>
          <button className="py-6 bg-orange-set text-black font-semibold px-32 rounded-3xl" onClick={handleClick}>
            Try Again
          </button>
        </div>
        {!isConnected && (
          <div className="text-red-500 mt-4">
            Reconnecting...
          </div>
        )}
      </div>
    </div>
  );
}
