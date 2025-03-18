import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? <AdminNavbar /> : <UserNavbar />;
};

export default Navbar;
