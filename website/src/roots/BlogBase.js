import React from "react";
import { Outlet } from "react-router-dom";

function BlogBase() {
  return (
    <div>
      BlogBase <Outlet />
    </div>
  );
}

export default BlogBase;
