import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import UserProvider from "./components/users/UserProvider";
import ThreadProvider from "./components/threads/ThreadProvider";
import PostProvider from "./components/posts/PostProvider";
import LoginPage from "./components/routes/LoginPage";
import HomePage from "./components/routes/HomePage";
import ProfilePage from "./components/routes/ProfilePage";
import ThreadPage from "./components/routes/ThreadPage";
import ThreadExplorePage from "./components/routes/ThreadExporePage";
import PostPage from "./components/routes/PostPage";

function App() {
  return (
    <>
      <UserProvider>
        <ThreadProvider>
          <PostProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/threads" element={<ThreadExplorePage />} />
              <Route path="/threads/:id" element={<ThreadPage />} />
              <Route path="/posts/:id" element={<PostPage />} />
            </Routes>
          </PostProvider>
        </ThreadProvider>
      </UserProvider>
    </>
  );
}

export default App;
