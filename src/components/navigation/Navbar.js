import "./Navbar.css";
import { UserContext } from "../users/UserProvider";
import { useContext } from "react";

export default function Navbar() {
  const { user, logOutUser } = useContext(UserContext);

  const loginHandler = () => {
    console.log("Navigate to userForm page");
  };

  const logoutHandler = () => {
    logOutUser();
  };

  return (
    <div className="navbar-container">
      {user ? (
        <button id="logout-button" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <button id="login/register-button" onClick={loginHandler}>
          Login / Register
        </button>
      )}
    </div>
  );
}
