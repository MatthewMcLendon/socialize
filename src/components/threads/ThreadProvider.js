import { createContext, useEffect, useState } from "react";

export const ThreadContext = createContext();

export default function ThreadProvider(props) {
  const [threads, setThreads] = useState();

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = () => {
    return fetch("http://localhost:8088/threads")
      .then((response) => response.json())
      .then((response) => setThreads(response));
  };

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
