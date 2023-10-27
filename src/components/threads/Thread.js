import "./Thread.css";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { useContext, useEffect, useState } from "react";

export default function Thread() {
  const { deleteThread, getThreadById } = useContext(ThreadContext);
  const [thread, setThread] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getThread();
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
