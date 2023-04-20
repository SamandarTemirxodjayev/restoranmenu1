import { Navigate } from "react-router-dom"
import Navbar from "./Navbar"

export default function AdminHome() {
  const id = localStorage.getItem('id')
  if(!id) return <Navigate to="/admin/login" />
  return (
    <div>
      <Navbar />
    </div>
  )
}
