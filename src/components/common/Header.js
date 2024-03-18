import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../app/assets/UserIcon.svg";
import { ReactComponent as BellIcon } from "../../app/assets/BellIcon.svg";
import { ReactComponent as SettingsIcon } from "../../app/assets/SettingsIcon.svg";


const Header = ({PageIcon, pageTitle}) => {
  
  return (
    <nav
      className="flex items-center justify-between p-4 relative"
      id="nav-bar"
    >
      <div className="flex items-center relative">
        <PageIcon className="colored-svg mr-4 w-6 h-6" />
        {pageTitle}
      </div>

      <div className="flex group items-center space-x-2 relative">
        <SettingsIcon className="cursor-pointer" />

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