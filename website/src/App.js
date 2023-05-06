import { Routes, Route } from "react-router-dom";
import Home from "./roots/Home.js";
import BlogBase from "./roots/BlogBase";
import BlogPosts from "./roots/BlogPosts";
import Auth from "./roots/Auth";
import { useState, useContext, useEffect } from "react";
import UserContext from "./contexts/UserContext.js";
import { fetchUserProfile } from "./services/private_services.js";
import { isAuthenticated } from "./services/public_services.js";

function App() {
  const [userProfile, setUserProfile] = useState({});

  function loadUserProfile() {
    if (isAuthenticated()) {
      fetchUserProfile().then((data) => {
        data["fullName"] = data.full_name;
        setUserProfile(data);
      });
    }
  }

  useEffect(() => {
    if (Object.keys(userProfile).length === 0) loadUserProfile();
  }, [userProfile]);

  return (
    <UserContext.Provider value={userProfile}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<BlogBase />}>
          <Route path="posts/:userId" element={<BlogPosts />} />
        </Route>

        <Route
          path="authenticate/"
          element={<Auth loadUserProfile={loadUserProfile} />}
        />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
