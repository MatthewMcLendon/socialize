import CommentForm from "../comments/CommentForm";
import { CommentContext } from "../comments/CommentProvider";
import { useContext, useEffect, useState } from "react";

// Page for editing comments
export default function CommentPage() {
  // import update and delete from context
  const { updateComment, deleteComment, getComment } = useContext(CommentContext);
  const { comment, setComment } = useState({});

  // get comment info from db
  useEffect(() => {
    const getComment = async () => {};
    getComment();
  }, []);

  // render form
  return (
    <main>
      <CommentForm />
    </main>
  );
}
