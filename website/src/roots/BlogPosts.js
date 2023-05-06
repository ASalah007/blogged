import React, { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost";
import "./styles/blogposts.sass";
import { fetchUserBlogPosts } from "../services/private_services";

function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  console.log(blogPosts)
  useEffect(() => {
    fetchUserBlogPosts().then((data) => {
      setBlogPosts(data);
    });
  }, []);

  return (
    <div className="blogposts">
      <div className="actions">actions</div>
      <div className="posts">
        {blogPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default BlogPosts;
