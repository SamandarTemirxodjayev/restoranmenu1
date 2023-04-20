import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import Slider from './Slider';
import Menu from './Menu';
import CatalogMenu from './CatalogMenu';
import Search from './Search';

export default function Home() {
  const [ catalogs, setCatalogs ] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get('https://restoran-server-project.vercel.app/catalog')
      .then(response => {
        setCatalogs(response.data.catalogs);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if(!loading) {
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-10 bg-deafult-color'>
      <div className="text-7xl font-bold font-exo-2">
        Delicious <br />
        food for you
      </div>
      <div className="mt-12 relative">
        <Search />
      </div>
      {!id ? (
        <div className=" flex my-12 text-gray-400 text-4xl overflow-x-auto whitespace-nowrap">
          <div key={id} className="mx-3 cursor-pointer text-orange-set " style={{ borderBottom: '2px solid #FFC83A' }}>
            All
          </div>
          {catalogs.map((catalog) => (
          <div key={catalog._id} className="mx-3 cursor-pointer text-gray-500 ">
            <Link to={`/home/${catalog._id}`}>
              {catalog.name}
            </Link>
          </div>
        ))}

      </div>

      ):
      (
        <div className=" flex my-12 text-gray-400 text-4xl overflow-x-auto whitespace-nowrap">
        <div key={id} className="mx-3 cursor-pointer text-gray-500 ">
          <Link to='/home'>
            All
          </Link>
        </div>
          {catalogs.map((catalog) => {
            return (
              <div key={catalog._id}>
                {id === catalog._id ? (
                  <div className="mx-3 cursor-pointer text-orange-set " style={{ borderBottom: '2px solid #FFC83A' }}>
                    <Link to={`/home/${catalog._id}`}>
                      {catalog.name}
                    </Link>
                  </div>
                ) : (
                  <div className="mx-3 cursor-pointer text-gray-500 ">
                    <Link to={`/home/${catalog._id}`}>
                      {catalog.name}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

    </div>
      )}
      <Slider />
      <div className="">
        {!id ? (<Menu />) : (<CatalogMenu />)}
      </div>
    </div>
  );
      }
  if(loading) {
    return <div className='text-center items-center flex justify-center h-screen'>Loading...</div>
    
  }
}
