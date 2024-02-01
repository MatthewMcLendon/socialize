import { createContext, useEffect, useState } from "react";

// create context
export const ThreadContext = createContext();

// provide thread and related data
export default function ThreadProvider(props) {
  // create state for storing all threads
  const [threads, setThreads] = useState();

  // sync to db
  useEffect(() => {
    getThreads();
  }, []);

  // get route
  const getThreads = () => {
    return fetch("http://localhost:8088/threads")
      .then((response) => response.json())
      .then((response) => setThreads(response));
  };

  // get by Id route
  const getThreadById = (id) => {
    return fetch(`http://localhost:8088/threads/${id}`).then((response) => response.json());
  };

  // post route
  const addThread = (thread) => {
    return fetch("http://localhost:8088/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    }).then(getThreads);
  };

  // delete route
  const deleteThread = (thread) => {
    return fetch(`http://localhost:8088/threads/${thread.id}`, {
      method: "DELETE",
    }).then(getThreads);
  };

  // put route
  const updateThread = (thread) => {
    return fetch(`http://localhost:8088/threads/${thread.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    }).then(getThreads);
  };

  // create provider
  return (
    <ThreadContext.Provider
      value={{
        threads,
        addThread,
        deleteThread,
        updateThread,
        getThreadById,
      }}
    >
      {props.children}
    </ThreadContext.Provider>
  );
}
