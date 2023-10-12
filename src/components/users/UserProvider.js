import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  const logInUser = (user) => {
    localStorage.setItem("user", user.id);
    setUser(user);
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

  return (
    <UserContext.Provider value={{ user, addUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
