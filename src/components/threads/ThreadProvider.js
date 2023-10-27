import { createContext, useEffect, useState } from "react";

export const ThreadContext = createContext();

export default function ThreadProvider(props) {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = () => {
    return fetch("http://localhost:8088/threads")
      .then((response) => response.json())
      .then((response) => setThreads(response));
  };

  const getThreadById = (id) => {
    return fetch(`http://localhost:8088/threads/${id}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  };

  const addThread = (thread) => {
    return fetch("http://localhost:8088/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    }).then(getThreads);
  };

  const deleteThread = (thread) => {
    return fetch(`http://localhost:8088/threads/${thread.id}`, {
      method: "DELETE",
    }).then(getThreads);
  };

  const updateThread = (thread) => {
    return fetch(`http://localhost:8088/threads/${thread.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    }).then(getThreads);
  };

  return (
    <ThreadContext.Provider
      value={{ threads, addThread, deleteThread, updateThread, getThreadById }}
    >
      {props.children}
    </ThreadContext.Provider>
  );
}
