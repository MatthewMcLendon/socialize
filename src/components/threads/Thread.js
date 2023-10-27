import "./Thread.css";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { useContext, useEffect, useState } from "react";

export default function Thread() {
  const { deleteThread, getThreadById } = useContext(ThreadContext);
  const [thread, setThread] = useState();
  const { id } = useParams();

  useEffect(() => {
    getThread();
    console.log(thread);
  }, []);

  const navigate = useNavigate();

  const deleteHandler = () => {
    deleteThread();
    navigate("/home");
  };

  const getThread = async () => {
    console.log(getThreadById(id));
    // let taco = await getThreadById(id);
    // setThread(taco);
    // console.log(thread);
  };

  return (
    <>
      {/* <h2>{thread.name}</h2> */}
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}

// threads.find((thread) => thread.id === Number(id)
