import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogStats } from "../services/private_services";
import styles from "./styles/blogpost.module.sass";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";

function BlogPost({ post }) {
  const updatedAt = new Date(post.updated_at).toDateString().split(" ");
  const lastModifiedAt = updatedAt[1] + " " + updatedAt[2];
  const [stats, setStats] = useState({ comments_count: 0, views_count: 0 });

  useEffect(() => {
    setTimeout(()=>{}, )
    fetchBlogStats(post.id).then((data) => {
      setStats(data);
      console.log(data);
    });
  }, []);

  return (
    <div className={styles.post}>
      <Link to="/">
        <div className={styles.thumbnail}>
          {post.thumbnail ? (
            <img href={post.thumbnail} alt="thumbnail" />
          ) : post.title ? (
            post.title[0]
          ) : (
            "U"
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.title}>
            {post.title ? post.title : "(Untitled)"}
          </div>
          <div className={styles.blogStatus}>
            {post.pub_date ? (
              <span>Published</span>
            ) : (
              <span style={{ color: "#f57c00" }}>Draft</span>
            )}
            <span> • </span>
            <span>{lastModifiedAt}</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.actions}>actions</div>
          <div className={styles.stats}>
            <div className={styles.comments}>
              <span>
                {Object.keys(stats).length !== 0 ? stats.comments_count : 0}
              </span>
              <ModeCommentIcon />
            </div>

            <div className={styles.comments}>
              <span>0</span>
              <StackedBarChartIcon />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogPost;
