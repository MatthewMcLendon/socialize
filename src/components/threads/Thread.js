import "./Thread.css";
import { useNavigate, useParams } from "react-router-dom";
import { ThreadContext } from "./ThreadProvider";
import { UserContext } from "../users/UserProvider";
import { useContext, useEffect, useState } from "react";

export default function Thread() {
<<<<<<< HEAD
  const { threads, deleteThread, getThreadById } = useContext(ThreadContext);
  const { user } = useContext(UserContext);

  const [thread, setThread] = useState();
  const [isModerator, setIsModerator] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    threads
      ? setThread(threads.find((thread) => thread.id === Number(id)))
      : getThread();
=======
  const { deleteThread, getThreadById } = useContext(ThreadContext);
  const [thread, setThread] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getThread();
>>>>>>> parent of c11d5ae (bug: rework Thread and ThreadList to check for data on init)
  }, []);

  // useEffect(() => {
  //   moderatorCheck();
  // }, [user]);

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

  const moderatorCheck = () => {
    console.log(user);
    console.log(thread);
    if (user && thread) {
      // setIsModerator(thread.moderators.includes(user.id));
      console.log(thread.moderators.includes(1));
    }
  };

  return (
    <>
      {console.log(thread)}
      <h2>{thread.name}</h2>
      {/* <button onClick={deleteHandler}>Delete</button> */}
      {/* {isModerator ? <p>Moderator!</p> : null} */}
    </>
  );
}
