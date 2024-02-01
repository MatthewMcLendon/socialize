import { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { Link } from "react-router-dom";
import Card from "../style/card";

// Format and render comment data from comment prop
export default function Comment({ comment }) {
  // import getUserById function from UserContext, save output to user state
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});

  // sync with db
  useEffect(() => {
    const getUser = async () => {
      var user = await getUserById(comment.user);
      setUser(user);
    };

    getUser();
  }, [comment]);

  // render
  return (
    <Card>
      <Link to={`/profile/${user.id}`}>{user.username}</Link>
      <p>{comment.text}</p>
    </Card>
  );
}
