import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/images/logo.png";
import "./styles/nav.sass";

function Nav() {
  const userProfile = useContext(UserContext);

  return (
    <div className="nav">
      <div className="left">
        <div className="menu">
          <MenuIcon sx={{ color: "#555", fontSize: "2.5rem" }} />
        </div>
        <div className="logo">
          <a href=".">
            <img src={logo} alt="logo" />
          </a>
        </div>
      </div>

      <div className="center">
        <div className="search-bar">
          <div>
            <SearchIcon
              sx={{
                color: "#555",
                fontSize: "2.5rem",
                transform: "translateY(.2rem)",
              }}
            />
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="profile">
        {userProfile.fullName ? userProfile.fullName[0] : "N"}
      </div>
    </div>
  );
}

export default Nav;
