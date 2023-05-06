import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import "./styles/blogbase.sass";

function BlogBase() {
  return (
    <div className="root">
      <Nav />

      <div className="main">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default BlogBase;
