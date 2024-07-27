import React, { useRef, useEffect } from "react";
import {
  LogOut,
  ArrowLeftToLine,
  ArrowRightToLine,
  LayoutDashboard,
  SquareUserRound,
  LibraryBig,
  CircleUserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../credenciales";
import SidebarItem from "../components/SidebarItem";

const Sidebar = ({ children, user }) => {
  const { expanded, setExpanded } = useSidebar();
  const navigate = useNavigate();
  const auth = getAuth(appFirebase);
  const sidebarRef = useRef();

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen z-10 bg-white border-r shadow-sm ${
        expanded ? "w-64" : "w-16"
      } transition-width duration-300`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-between items-start">
          <CircleUserRound
            size={60}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ArrowLeftToLine /> : <ArrowRightToLine />}
          </button>
        </div>
        <ul className="flex-1 px-3">
          <Link to="/home">
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Home" />
          </Link>
          <Link to="/aboutme">
            <SidebarItem icon={<SquareUserRound size={20} />} text="Sobre Mí" />
          </Link>

          <Link to="/addmatery">
            <SidebarItem
              icon={<LibraryBig size={20} />}
              text="Agregar Materia"
            />
          </Link>

          {children}
        </ul>
        <div className="border-t flex p-2">
          <div
            className={`${
              expanded
                ? " w-10 rounded-md items-center justify-between flex"
                : "w-0"
            }`}
          >
            <img
              className="rounded-md"
              src={user?.photoURL || "no image"}
              alt="User Avatar"
            />
          </div>

          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-xs">
                {user?.displayName || "Usuario"}
              </h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="m-1 rounded-lg bg-gray-50 hover:bg-gray-100 ml-3 justify-between items-center"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
