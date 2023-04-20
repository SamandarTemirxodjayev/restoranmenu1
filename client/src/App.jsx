import React from 'react'
import Router from './router'
import useInternetConnectivity from './components/useInternetConnectivity';
import NoInternet from './components/NoInternet';
import noInternetImg from './assets/nointernet.png';

export default function App() {
  const isOnline = useInternetConnectivity();
  return (
    <div>
      <img src={noInternetImg} alt="" style={{display: "none"}} />
    {isOnline ? (
      <div>
        <Router>
          
        </Router>
      </div>
    ) : (
      <div>
        <NoInternet />
      </div>
    )}
  </div>
  )
}
