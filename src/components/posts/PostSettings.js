import { useContext } from "react";
import { PostContext } from "./PostProvider";
import { useNavigate } from "react-router-dom";

export default function PostSettings({
  isEditable,
  isModerator,
  post,
  setIsEditing,
}) {
  const navigate = useNavigate();
  const { deletePost } = useContext(PostContext);

  const deleteHandler = () => {
    deletePost(post.id);
    navigate(`/threads/${post.thread}`);
  };

  return (
    <div className="post-settings">
      <button
        onClick={() => {
          setIsEditing(false);
        }}
      >
        X
      </button>
      {isEditable || isModerator ? (
        <button className="post-delete-button" onClick={deleteHandler}>
          Delete
        </button>
      ) : null}
    </div>
  );
}
