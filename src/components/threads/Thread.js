import "./Thread.css";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { useContext } from "react";

export default function Thread() {
  const { threads, deleteThread } = useContext(ThreadContext);
  const { id } = useParams();

  const thread = threads.find((thread) => thread.id.toString() === id);

  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteThread();
    navigate("/home");
  };

  return (
    <>
      <h2>{thread.name}</h2>
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}
