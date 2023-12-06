import { useContext, useState, useEffect } from "react";
import { UserContext } from "../users/UserProvider";
import { ThreadContext } from "../threads/ThreadProvider";
import { Link, useNavigate } from "react-router-dom";
import Card from "../style/card";

export default function Post({ post, setIsEditing, isEditable, isModerator }) {
  const { users } = useContext(UserContext);
  const { threads } = useContext(ThreadContext);

  const [user, setUser] = useState([]);
  const [thread, setThread] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (users && threads) {
      setUser(users.find((user) => user.id === post.user));
      setThread(threads.find((thread) => thread.id === post.thread));
    }
  }, [users, post, threads]);

  const navigationHandler = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <Card>
      {user && thread ? (
        <>
          <div className="post-container" onClick={navigationHandler}>
            <h3>{post.title}</h3>
            {isEditable || isModerator ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            ) : null}
            {post.image ? <img src={post.image} alt="" /> : null}
            <p>{post.text}</p>
          </div>
          <div className="post-links">
            <p>
              Posted by <Link to={`/profile/${user.id}`}>{user.username}</Link>{" "}
              in <Link to={`/threads/${thread.id}`}>{thread.name}</Link>
            </p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
}
