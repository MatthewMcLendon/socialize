import "./Navbar.css";
import { UserContext } from "../users/UserProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logOutUser } = useContext(UserContext);

  const logoutHandler = () => {
    logOutUser();
  };

  const links = user ? (
    <ul className="links-list">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={`/profile/${user.id}`}>Profile</Link>
      </li>
      <li>
        <Link to={"/threads"}>Threads</Link>
      </li>
    </ul>
  ) : (
    <ul>
      <Link to={"/"}>Home</Link>
    </ul>
  );

  const buttons = user ? (
    <button id="logout-button" onClick={logoutHandler}>
      Logout
    </button>
  ) : (
    <button id="login/register-button">
      <Link to={"/login"}>Login / Register</Link>
    </button>
  );

  return (
    <nav className="navbar-container">
      {links}
      {buttons}
    </nav>
  );
}
