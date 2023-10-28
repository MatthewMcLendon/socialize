import "./Thread.css";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { useContext, useEffect, useState } from "react";

export default function Thread() {
  const { threads, deleteThread, getThreadById } = useContext(ThreadContext);
  const [thread, setThread] = useState({});
  const { id } = useParams();

  useEffect(() => {
    threads
      ? setThread(threads.find((thread) => thread.id === Number(id)))
      : getThread();
  }, []);

  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteThread();
    navigate("/home");
  };

  const getThread = async () => {
    await getThreadById(id).then((response) => {
      setThread(response);
    });
  };

  return (
    <>
      <h2>{thread.name}</h2>
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}

// add thread settings. Check if moderator, delete, update
