import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import GetStarted from "./components/GetStarted";
import Home from "./components/Home";
import MenuItem from "./components/MenuItem";
import AdminHome from "./components/admin/AdminHome";
import Login from "./components/admin/Login";
import CreateCatalog from "./components/admin/CreateCatalog";
import CreateMenu from "./components/admin/CreateMenu";
import CreateBanner from "./components/admin/CreateBanner";
import NotFound from "./components/NotFound";

export default function Router() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/menu/:id" element={<MenuItem />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/create/catalog" element={<CreateCatalog />} />
        <Route path="/admin/create/menu" element={<CreateMenu />} />
        <Route path="/admin/create/banner" element={<CreateBanner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    // </BrowserRouter>
  );
}
