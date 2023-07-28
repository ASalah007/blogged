import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation } from "react-router-dom";
import "./styles/sidebar.sass";
import ArticleIcon from "@mui/icons-material/Article";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import SettingsIcon from "@mui/icons-material/Settings";

function SideBar() {
  const buttonList = [
    [<ArticleIcon fontSize="large" />, "Posts", "/blog/posts"],
    [<StackedBarChartIcon fontSize="large" />, "Stats", "/"],
    [<ModeCommentIcon fontSize="large" />, "Comments", "/"],
    [<SettingsIcon fontSize="large" />, "Settings", "/"],
  ];
  const { pathname } = useLocation();
  return (
    <div className="sidebar">
      <div className="new-post">
        <AddIcon fontSize="large" />
        <span>NEW POST</span>
      </div>

      <div className="divider"></div>

      <div className="button-list">
        {buttonList.map((e, i) => (
          <Link key={i} to={e[2]} id={pathname === e[2] && "active-path"}>
            {e[0]} <span>{e[1]}</span>
          </Link>
        ))}
      </div>

      <div className="divider"> </div>

      <div className="footer"></div>
    </div>
  );
}

export default SideBar;
