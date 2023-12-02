import { useContext, useState, useEffect } from "react";
import { UserContext } from "../users/UserProvider";
import { ThreadContext } from "../threads/ThreadProvider";
import { Link } from "react-router-dom";
import Card from "../style/card";

export default function Post({ post }) {
  const { users } = useContext(UserContext);
  const { threads } = useContext(ThreadContext);

  const [user, setUser] = useState([]);
  const [thread, setThread] = useState({});

  useEffect(() => {
    if (users && threads) {
      setUser(users.find((user) => user.id === post.user));
      setThread(threads.find((thread) => thread.id === post.thread));
    }
  }, [users, post, threads]);

  return (
    <Card>
      <h3>{post.title}</h3>
      <Link to={`/profile/${user.id}`}>{user.username}</Link>
      <Link to={`/threads/${thread.id}`}>{thread.name}</Link>
      {post.image ? <img src={post.image} alt="" /> : null}
      <p>{post.text}</p>
    </Card>
  );
}
