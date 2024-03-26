import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-indigo-700 min-h-12 lg:hidden">
      <div className="px-10">
        <div className="flex items-center justify-between">
          <img
            src="../../public/assets/Extrality.png"
            alt="avatar"
            className="h-20 w-20 rounded-full"
          />
          <GiHamburgerMenu
            className="h-6 w-6 text-white cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        {/* Sidebar Content */}
        {isSidebarOpen && (
          <div className="mt-4 bg-white rounded-lg shadow-lg">
            {/* Sidebar Items */}
            <ul>
              <li className="py-2 px-4">Sidebar Item 1</li>
              <li className="py-2 px-4">Sidebar Item 2</li>
              <li className="py-2 px-4">Sidebar Item 3</li>
              {/* Add more sidebar items as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
