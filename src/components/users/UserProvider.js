import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    returningUserCheck();
  }, []);

  const returningUserCheck = () => {
    const returningUser = JSON.parse(localStorage.getItem("user"));
    if (returningUser) {
      setUser(returningUser);
    }
  };

  const logInUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logOutUser = () => {
    localStorage.clear();
    setUser();
    navigate("/");
  };

  const addUser = (user) => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(logInUser(user));
  };

  const deleteUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "DELETE",
    }).then(logOutUser);
  };

  const updateUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(() => logInUser(user))
      .then(getUsers);
  };

  const getUsers = () => {
    return fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((response) => setUsers(response));
  };

  const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`).then((response) =>
      response.json()
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        addUser,
        logInUser,
        logOutUser,
        deleteUser,
        updateUser,
        getUserById,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
