import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export default function Menu({ id }) {
  const [menu, setMenu] = React.useState([]);
  const [catalog, setCatalog] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    axios
      .get("https://restoran-server-project.vercel.app/catalog")
      .then((res) => {
        setCatalog(res.data.catalogs);
      });
    axios
      .get("https://restoran-server-project.vercel.app/menu")
      .then((res) => {
        setMenu(res.data.menus);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, []);
  const handleOnload = () => {};

  return (
    <div>
      {catalog.map((catalog) => (
        <div key={catalog._id} className="p-2 cursor-pointer ">
          <h2 className="text-5xl font-bold p-4">{catalog.name}</h2>
          <div className="container">
            <div className=" overflow-x-auto whitespace-nowrap flex">
              {menu.map((menu, id) =>
                catalog._id === menu.category_id ? (
                  <div
                    className="rounded-t-lg mx-2 my-2 flex-none"
                    style={{ width: "300px" }}
                    key={id}
                  >
                    <Link to={`/menu/${menu._id}`}>
                      {loading ? (
                        <div className="">
                          <img
                            src={menu.photo_url}
                            alt={menu.name}
                            className="none"
                            onLoad={handleOnload}
                          />
                          <SkeletonTheme baseColor="#ccc" highlightColor="#fff">
                            <p>
                              <Skeleton width={300} height={200} />
                            </p>
                          </SkeletonTheme>
                        </div>
                      ) : (
                        <img
                          src={menu.photo_url}
                          alt={menu.name}
                          className="rounded-t-lg rounded-b-sm"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-4xl mb-2">{menu.name}</h3>
                        <div className="flex justify-between text-end">
                          <span className="font-bold text-2xl">
                            {Number(menu.price).toLocaleString()} so'm
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
