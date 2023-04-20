import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import firebaseApp from "./firebase"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function CreateBanner() {
  const [ name, setName ] = useState("");
  const [ catalog, setCatalog ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    axios.get("https://restoranmenu1.vercel.app/banner")
    .then(res => {
        console.log(res.data.banners);
        setCatalog(res.data.banners);
        setLoading(false);
      })
  },[])
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const file = imageRef.current.files[0];
    const fileName = file.name;
    const storage = getStorage(firebaseApp);
    const pathFile = `banner/${fileName}`;
    const storageRef = ref(storage, pathFile);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        axios
          .put("https://restoranmenu1.vercel.app/banner", {
            photo_url: downloadURL,
          })
          .then((res) => {
            window.location.reload()
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      });
    });
  }
  
  function handleDelete(id) {
    setLoading(true);
    axios.delete(`https://restoranmenu1.vercel.app/banner/${id}`)
      .then(res => {
        window.location.reload()
        setLoading(false);
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
              Select Banner Photo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="file"
              ref={imageRef}
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
            <div className="text-3xl bd-black m-16">Not Have Banner</div>
          ) : (
            <>
              <div className="text-3xl bd-black m-4">
                {catalog.map((item, key) => (
                  <div key={key} className='m-2 bg-green-300 rounded-md p-2 justify-between flex items-center'>
                    {item._id}
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
