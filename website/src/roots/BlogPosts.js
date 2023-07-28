import React, { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost";
import "./styles/blogposts.sass";
import { fetchUserBlogPosts } from "../services/private_services";
import SideBar from "../components/SideBar";
import LabelIcon from "@mui/icons-material/Label";

function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [manage, setManage] = useState(false);
  useEffect(() => {
    fetchUserBlogPosts().then((data) => {
      data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setBlogPosts(data);
    });
  }, []);

  return (
    <div className="main">
      <SideBar />
      <div className="blogposts">
        <div className="posts-wrapper">
          <div className="actions">
            <div>actions</div>
            <div className="manage-part">
              <div
                className="label-filter"
                style={{ visibility: manage && "hidden" }}
              >
                <LabelIcon sx={{ fontSize: "2.5rem", color: "#777" }} />
              </div>

              <div className="manage" onClick={() => setManage((old) => !old)}>
                {manage ? "CANCEL" : "MANAGE"}
              </div>
            </div>
          </div>
          <div className="posts">
            {blogPosts.map((post) => (
              <BlogPost key={post.id} post={post} selectEnable={manage} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPosts;
