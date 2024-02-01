import { useContext } from "react";
import { UserContext } from "../users/UserProvider";
import { CommentContext } from "./CommentProvider";
import Card from "../style/card";

// render a form for creating a comment on a post from props, handle the submission
export default function CommentForm({ post, comment }) {
  // import current user and post route for comments from contexts
  const { user } = useContext(UserContext);
  const { addComment } = useContext(CommentContext);

  // get form data and submit to db
  const submitHandler = (event) => {
    event.preventDefault();

    const comment = {
      user: user.id,
      post: post.id,
      text: document.querySelector(".comment-form-text").value,
    };

    addComment(comment);
  };

  // render
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="comment-form-text"
          placeholder="Comment"
          required
        />
        <input type="submit" value={"Post"} />
      </form>
    </Card>
  );
}
