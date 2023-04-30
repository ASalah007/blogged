import { Routes, Route } from "react-router-dom";
import Home from "./roots/Home.js";
import BlogBase from "./roots/BlogBase";
import BlogPosts from "./roots/BlogPosts";
import Auth from "./roots/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="blog" element={<BlogBase />}>
        <Route path="posts/:userId" element={<BlogPosts />} />
      </Route>

      <Route path="authenticate/" element={<Auth />} />
      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
}

export default App;
