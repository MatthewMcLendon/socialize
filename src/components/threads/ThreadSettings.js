import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";

export default function ThreadSettings({ thread }) {
  const { deleteThread } = useContext(ThreadContext);
  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteThread();
    navigate("/home");
  };

  return <h1>{thread.name} settings</h1>;
}
