import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  draftPost,
  fetchBlogStats,
  publishPost,
} from "../services/private_services";
import styles from "./styles/blogpost.module.sass";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import CheckBox from "./utils/CheckBox";
import SendIcon from "@mui/icons-material/Send";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function BlogPost({ post: _post, onSelect, selectEnable }) {
  const [stats, setStats] = useState({ comments_count: 0, views_count: 0 });
  const [displayActions, setDisplayActions] = useState(false);
  const [post, setPost] = useState(_post);

  const updatedAt = new Date(post.updated_at).toDateString().split(" ");
  const lastModifiedAt = updatedAt[1] + " " + updatedAt[2];

  const publishedActions = [
    [
      <SendAndArchiveIcon />,
      "Revert to Draft",
      (e) => draftPost(post.id).then((data) => setPost(data ?? post)),
    ],
    [<LabelIcon />, "Apply labels to this post", (e) => {}],
    [<DeleteIcon />, "Move this post to trash", (e) => {}],
    [<VisibilityIcon />, "View", (e) => {}],
  ];

  console.log("rendered");
  const draftActions = [
    [
      <SendIcon />,
      "Publish",
      (e) => publishPost(post.id).then((data) => setPost(data ?? post)),
    ],
    [<LabelIcon />, "Apply labels to this post", (e) => {}],
    [<DeleteForeverIcon />, "Discard this post", (e) => {}],
    [<VisibilityIcon />, "Preview", (e) => {}],
  ];

  const actions = post.pub_date ? publishedActions : draftActions;

  useEffect(() => {
    setTimeout(() => {});
    fetchBlogStats(post.id).then((data) => {
      setStats(data);
    });
  }, []);

  return (
    <div
      className={styles.post}
      onMouseEnter={() => setDisplayActions(true)}
      onMouseLeave={() => setDisplayActions(false)}
    >
      {selectEnable && <CheckBox />}
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
          <div className={styles.actions}>
            {displayActions &&
              actions.map((e, i) => (
                <div
                  key={i}
                  onClick={(event) => {
                    event.preventDefault();
                    e[2](event);
                  }}
                >
                  {e[0]}
                </div>
              ))}
          </div>
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
