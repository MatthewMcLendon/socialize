import { useContext, useState, useEffect } from "react";
import { UserContext } from "../users/UserProvider";
import { ThreadContext } from "../threads/ThreadProvider";
import { PostContext } from "../posts/PostProvider";
import { Link, useNavigate } from "react-router-dom";
import Card from "../style/card";

export default function Post({ post, setIsEditing, isEditable, isModerator }) {
  const { users, user } = useContext(UserContext);
  const { threads } = useContext(ThreadContext);
  const { updatePost } = useContext(PostContext);

  const [poster, setPoster] = useState([]);
  const [thread, setThread] = useState({});
  const [likeCount, setLikeCount] = useState(0);

  const navigate = useNavigate();

  const likeHandler = () => {
    post.likes.push(user.id);
    updatePost(post);
  };

  useEffect(() => {
    if (users && threads && post.likes) {
      setPoster(users.find((user) => user.id === post.user));
      setThread(threads.find((thread) => thread.id === post.thread));
      setLikeCount(post.likes.length);
    }
  }, [users, post, threads]);

  const navigationHandler = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <Card>
      {poster && thread ? (
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
              Posted by{" "}
              <Link to={`/profile/${poster.id}`}>{poster.username}</Link> in{" "}
              <Link to={`/threads/${thread.id}`}>{thread.name}</Link>
            </p>
          </div>
          <button onClick={likeHandler}>Like!</button>
          {/* <p>Likes: {post.likes.length}</p> */}
          {console.log(likeCount)}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
}
