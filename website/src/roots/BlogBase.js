import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import "./styles/blogbase.sass";

function BlogBase() {
  return (
    <div className="root">
      <Nav />
      <Outlet />
    </div>
  );
}

export default BlogBase;
