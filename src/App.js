import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import UserProvider from "./components/users/UserProvider";
import LoginPage from "./components/routes/LoginPage";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
