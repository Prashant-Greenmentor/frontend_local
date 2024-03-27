import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../app/assets/UserIcon.svg";
import { ReactComponent as BellIcon } from "../../app/assets/BellIcon.svg";
import { ReactComponent as SettingsIcon } from "../../app/assets/SettingsIcon.svg";


const Header = ({PageIcon, pageTitle}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav
      className="flex items-center justify-between p-4 relative bg-white"
      id="nav-bar"
    >
      <div className="flex items-center relative">
        <PageIcon className="colored-svg mr-4 w-6 h-6" />
        {pageTitle}
      </div>

      <div className="flex group items-center space-x-2 relative">
        <SettingsIcon className="cursor-pointer" onClick={toggleDropdown} />
        {isDropdownOpen && (
        <div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                User Profile
              </div>
            </Link>
          </div>
        </div>
      )}

        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: ".5rem",
            }}
          >
            <UserIcon className="cursor-pointer" />
          </div>
        </Link>
        <BellIcon className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Header;