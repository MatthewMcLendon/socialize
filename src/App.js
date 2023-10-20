import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import UserProvider from "./components/users/UserProvider";
import ThreadProvider from "./components/threads/ThreadProvider";
import LoginPage from "./components/routes/LoginPage";
import HomePage from "./components/routes/HomePage";
import ProfilePage from "./components/routes/ProfilePage";

function App() {
  return (
    <>
      <UserProvider>
        <ThreadProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </ThreadProvider>
      </UserProvider>
    </>
  );
}

export default App;
