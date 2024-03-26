import { RiLogoutBoxFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbHistory } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logOut } from "../state/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { RootState } from "../state/store";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.name);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="bg-indigo-700 min-h-12 lg:hidden">
      <div className="px-10">
        <div className="flex items-center justify-between">
          <img
            src="/assets/Extrality.png"
            alt="avatar"
            className="h-20 w-20 rounded-full"
          />
          <GiHamburgerMenu
            className="h-6 w-6 text-white cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        {isSidebarOpen && (
          <div className="rounded-lg p-5">
            <ul className="grid grid-rows-3 space-y-3 text-white">
              <Link to={"/profile"}>
                <button className="w-full border border-indigo-900 rounded-lg shadow-sm py-2 flex items-center justify-center space-x-2 hover:bg-indigo-900 transition-colors">
                  <CgProfile />
                  <span>Profile</span>
                </button>
              </Link>
              <Link to={"/home"}>
                <button className="w-full border border-indigo-900 rounded-lg shadow-sm py-2 flex items-center justify-center space-x-2 hover:bg-indigo-900 transition-colors">
                  <FaTasks />
                  <span>Your Tasks</span>
                </button>
              </Link>
              <Link to={"/history"}>
                <button className="w-full border border-indigo-900 rounded-lg shadow-sm py-2 flex items-center justify-center space-x-2 hover:bg-indigo-900 transition-colors">
                  <TbHistory />
                  <span>History</span>
                </button>
              </Link>
              <div className="p-2 flex space-x-3 border border-indigo-900 rounded-lg items-center justify-center">
                <FaCircleUser className="h-12 w-12 text-zinc-200 font-light" />
                <div>
                  <p className="text-lg text-white">{user}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full font-semibold  text-red-500 hover:text-white transition-colors rounded-lg shadow-sm flex items-center"
                  >
                    <RiLogoutBoxFill />
                    Logout
                  </button>
                </div>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
