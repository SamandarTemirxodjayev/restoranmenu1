import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function CreateCatalog() {
  const [ name, setName ] = useState("");
  const [ catalog, setCatalog ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    axios.get("https://restoran-server-project.vercel.app/catalog")
    .then(res => {
        setCatalog(res.data.catalogs);
        setLoading(false);
      })
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios.put("https://restoran-server-project.vercel.app/catalog", {
        name: name
    })
    .then(res => {
      console.log(res.data.catalog);
      setCatalog([...catalog, res.data.catalog]);
      setName("");
      setLoading(false);
    })
  }
  function handleDelete(id) {
    setLoading(true);
    axios.delete(`https://restoran-server-project.vercel.app/catalog/${id}`)
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }
  
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <div className='flex'>
      <div className="w-64">
        <Navbar />
      </div>
      <div className="flex justify-center w-full my-24">
      <div className="block">
        <form className="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{width: "400px"}} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Enter Catalog Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Catalog name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
          {catalog.length == 0 ? (
            <div className="text-3xl bd-black m-16">Not Have Catalog</div>
          ) : (
            <>
              <div className="text-3xl bd-black m-4">
                {catalog.map((item, key) => (
                  <div key={key} className='m-2 bg-green-300 rounded-md p-2 justify-between flex items-center'>
                    {item.name}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        handleDelete(item._id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  )
}
