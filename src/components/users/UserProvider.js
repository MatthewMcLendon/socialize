import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// export context
export const UserContext = createContext();

// provider user and related data
export default function UserProvider(props) {
  // states for all users and logged in user
  const [user, setUser] = useState();
  const [users, setUsers] = useState();

  // useNavigate shortcut for redirect after logout
  const navigate = useNavigate();

  // on initialization, get all users and check locatstorage for logged in user
  useEffect(() => {
    getUsers();
    returningUserCheck();
  }, []);

  // check localstorage for logged in user, if found set user state
  const returningUserCheck = () => {
    const returningUser = JSON.parse(localStorage.getItem("user"));
    if (returningUser) {
      setUser(returningUser);
    }
  };

  // save user data to localstorage and set user state. used in children components
  const logInUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // clear localstorage, set user state to default, navigate to home page. used in children components
  const logOutUser = () => {
    localStorage.clear();
    setUser();
    navigate("/");
  };

  // post route. log in user after creation
  const addUser = (user) => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(logInUser(user));
  };

  // delete route
  const deleteUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "DELETE",
    }).then(logOutUser);
  };

  // put route
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

  // get route for all users
  const getUsers = () => {
    return fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((response) => setUsers(response));
  };

  // get route for specific user by id
  const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`).then((response) => response.json());
  };

  // get route for specific user by username
  const getUserByName = (name) => {
    return fetch(`http://localhost:8088/users?username=${name}`).then((response) =>
      response.json()
    );
  };

  // create provider and pass states / functions
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
        getUserByName,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
