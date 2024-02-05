import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import UserProvider from "./components/users/UserProvider";
import ThreadProvider from "./components/threads/ThreadProvider";
import PostProvider from "./components/posts/PostProvider";
import CommentProvider from "./components/comments/CommentProvider";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import ProfilePage from "./components/pages/ProfilePage";
import ThreadPage from "./components/pages/ThreadPage";
import ThreadExplorePage from "./components/pages/ThreadExporePage";
import PostPage from "./components/pages/PostPage";
import CommentPage from "./components/pages/CommentPage";
import ModeratorProvider from "./components/moderators/ModeratorProvider";

function App() {
  return (
    <>
      <UserProvider>
        <ThreadProvider>
          <PostProvider>
            <CommentProvider>
              <ModeratorProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/profile/:id" element={<ProfilePage />} />
                  <Route path="/threads" element={<ThreadExplorePage />} />
                  <Route path="/threads/:id" element={<ThreadPage />} />
                  <Route path="/posts/:id" element={<PostPage />} />
                  <Route path="/comments/:id" element={<CommentPage />} />
                </Routes>
              </ModeratorProvider>
            </CommentProvider>
          </PostProvider>
        </ThreadProvider>
      </UserProvider>
    </>
  );
}

export default App;
