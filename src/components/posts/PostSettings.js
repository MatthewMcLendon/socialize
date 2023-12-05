import { useContext } from "react";
import { PostContext } from "./PostProvider";
import { useNavigate } from "react-router-dom";
import Card from "../style/card";

export default function PostSettings({
  isEditable,
  isModerator,
  post,
  setIsEditing,
}) {
  const navigate = useNavigate();
  const { deletePost, updatePost } = useContext(PostContext);

  const deleteHandler = () => {
    deletePost(post.id);
    navigate(`/threads/${post.thread}`);
  };

  const updateHandler = (event) => {
    event.preventDefault();

    const data = getFormData();
    const updatedPost = { ...post };

    if (data.title) {
      updatedPost.title = data.title;
    }

    if (data.text) {
      updatedPost.text = data.text;
    }

    if (data.image) {
      updatedPost.image = data.image;
    }

    updatePost(updatedPost);
    setIsEditing(false);
  };

  const getFormData = () => {
    const data = {
      title: document.querySelector(".post-update-title").value,
      text: document.querySelector(".post-update-text").value,
      image: document.querySelector(".post-update-image").value,
    };

    return data;
  };

  const updateForm = (
    <Card className="post-update-form">
      <form onSubmit={updateHandler}>
        <input
          type="text"
          className="post-update-title"
          placeholder={post.title}
        />
        <textarea
          className="post-update-text"
          name="post-update-text"
          id=""
          cols="30"
          rows="10"
          placeholder={post.text}
        ></textarea>
        <input
          className="post-update-image"
          type="text"
          placeholder={post.image ? post.image : "Image URL"}
        />
        <input type="submit" />
      </form>
    </Card>
  );

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
      {isEditable ? updateForm : null}
    </div>
  );
}
