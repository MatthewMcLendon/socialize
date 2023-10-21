import "./Thread.css";
import { useNavigate } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { useContext } from "react";

export default function Thread({ thread }) {
  const { deleteThread } = useContext(ThreadContext);
  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteThread(thread);
    navigate("/home");
  };

  return (
    <>
      <h2>{thread.name}</h2>
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}
