import { useContext, useState, useEffect } from "react";
import { UserContext } from "../users/UserProvider";
import { Link } from "react-router-dom";
import Card from "../style/card";

export default function Post({ post }) {
  const { users } = useContext(UserContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (users) {
      setUser(users.find((user) => user.id === post.user));
    }
  }, [users, post]);

  return (
    <Link to={`/posts/${post.id}`}>
      <Card>
        <h3>{post.title}</h3>
        <Link to={`/profile/${user.id}`}>{user.username}</Link>
        {post.image ? <img src={post.image} alt="" /> : null}
        <p>{post.text}</p>
      </Card>
    </Link>
  );
}
