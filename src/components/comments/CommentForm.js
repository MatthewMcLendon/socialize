import { useContext } from "react";
import { UserContext } from "../users/UserProvider";
import { CommentContext } from "./CommentProvider";
import Card from "../style/card";

// render a form for creating a comment on a post from props, handle the submission
export default function CommentForm({ post, comment }) {
  // import current user, post, and update route for comments from contexts
  const { user } = useContext(UserContext);
  const { addComment, updateComment } = useContext(CommentContext);

  // get form data and submit to db
  const submitHandler = (event) => {
    event.preventDefault();

    // update existing comment
    if (comment) {
      comment.text = document.querySelector(".comment-form-text").value;
      updateComment(comment);
      return;
    }

    // create new comment
    const newComment = {
      user: user.id,
      post: post.id,
      text: document.querySelector(".comment-form-text").value,
    };

    addComment(newComment);
  };

  // render
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="comment-form-text"
          placeholder={comment ? comment.text : "Comment"}
          required
        />
        <input type="submit" value={comment ? "Update" : "Post"} />
      </form>
    </Card>
  );
}
