import { createContext } from "react";

export const ThreadContext = createContext();

export default function ThreadProvider(props) {
  const addThread = (thread) => {
    return fetch("http://localhost:8088/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    });
  };

  return (
    <ThreadContext.Provider value={{ addThread }}>
      {props.children}
    </ThreadContext.Provider>
  );
}
