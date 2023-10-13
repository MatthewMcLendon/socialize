import "./Navbar.css";
import { UserContext } from "../users/UserProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logOutUser } = useContext(UserContext);

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
        <button id="login/register-button">
          <Link to={"/login"}>Login / Register</Link>
        </button>
      )}
    </div>
  );
}
