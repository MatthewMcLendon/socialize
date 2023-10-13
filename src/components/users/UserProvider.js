import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    // if (localStorage.getItem("user")) {
    //   users.find((user) => user.username === localStorage.getItem("user"));
    // }
  }, []);

  const logInUser = (user) => {
    localStorage.setItem("user", user.username);
    setUser(user);
  };

  const logOutUser = () => {
    localStorage.clear();
    setUser();
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

  const getUsers = () => {
    return fetch("http://localhost:8088/users").then((response) =>
      response.json()
    );
  };

  return (
    <UserContext.Provider
      value={{ user, addUser, getUsers, logInUser, logOutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
