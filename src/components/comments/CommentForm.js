import { useContext } from "react";
import { UserContext } from "../users/UserProvider";
import { CommentContext } from "./CommentProvider";
import Card from "../style/card";

export default function CommentForm({ post }) {
  const { user } = useContext(UserContext);
  const { addComment } = useContext(CommentContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const comment = {
      user: user.id,
      post: post.id,
      text: document.querySelector(".comment-form-text").value,
    };

    addComment(comment);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="comment-form-text"
          placeholder="Comment"
          required
        />
        <input type="submit" value={"Post"}/>
      </form>
    </Card>
  );
}
