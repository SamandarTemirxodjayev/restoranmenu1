import { useEffect, useRef, useState } from "react";
import axios from "axios";
import firebaseApp from "./firebase"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Navbar from "./Navbar";


export default function CreateMenu() {
  const [ menu, setMenu ] = useState([]);
  const [ catalog, setCatalog ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ error, setError ] = useState("");
  const imageRef = useRef(null);

  useEffect(() => {
    axios.get("https://restoranmenu1.vercel.app/menu")
      .then(res => {
        setMenu(res.data.menus);
      })
    
    axios.get("https://restoranmenu1.vercel.app/catalog")
      .then(res => {
        setCatalog(res.data.catalogs);
        setLoading(false);
      })
  }, []); // add dependency array to only run effect on mount
  

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const file = imageRef.current.files[0];
    const fileName = file.name;
    const storage = getStorage(firebaseApp);
    const pathFile = `menu/${fileName}`;
    const storageRef = ref(storage, pathFile);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        axios.put("https://restoranmenu1.vercel.app/menu", {
            name: name,
            photo_url: downloadURL,
            description: description,
            price: price,
            category_id: category,
        })
        .then(res => {
          setMenu([...menu, res.data]);
          setName("");
          setDescription("");
          setPrice("");
          setCategory("");
          setLoading(false);
        }).catch(error => {
          console.log(error);
          setError("Not saved");
          setLoading(false);
        })
      })
    });
    
  }
  function handleDelete(id) {
    setLoading(true);
    axios.delete(`https://restoranmenu1.vercel.app/menu/${id}`)
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        setError("Not deleted");
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
        
        <form className="bg-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{width: "500px"}} onSubmit={handleSubmit}>
          <div className="text-red-500 text-3xl font-bold">
            {error}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Write Menu Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Menu name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Write Menu Description 
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Menu name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Write Menu Price (only price)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Menu price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Choose Menu Category
            </label>
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setCategory(e.target.value)}>
              <option value="">Chooese</option>
              {catalog.map((item, id) => (
                <option key={id} value={item._id}>{item.name}</option>
              ))}
            </select>

            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Upload Photo 
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={imageRef}
              type="file"
              required
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
          {menu.length == 0 ? (
            <div className="text-3xl m-16">Not Have Menu</div>
          ) : (
            <>
              <div className="text-3xl">
              {menu.map((item, key) => (
                <div key={key} className='my-4 bg-green-300 rounded-md p-2 flex items-center justify-center' style={{maxWidth: "500px"}}>
                  <img src={item.photo_url} alt="" width={200} height={200} className="mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-xl text-gray-700">{item.description}</p> <br />
                    <p className="text-2xl font-bold">{item.price} so'm</p>
                    <p className="text-xl text-gray-700">{item.catalog_name}</p>
                  <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                      onClick={() => {
                        handleDelete(item._id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
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
