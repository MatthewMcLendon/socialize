import { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { Link } from "react-router-dom";
import Card from "../style/card";

export default function Comment({ comment }) {
  const { users } = useContext(UserContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = () => {
      const user = users.find((user) => user.id === comment.user);
      setUser(user);
    };

    if (users) {
      getUserData();
    }
  }, [users, comment]);

  return (
    <Card>
      {user ? <Link to={`/profile/${user.id}`}>{user.username}</Link> : null}
      <p>{comment.text}</p>
    </Card>
  );
}
