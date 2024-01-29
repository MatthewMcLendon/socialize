import { useContext } from "react";
import { UserContext } from "../users/UserProvider";
import { PostContext } from "./PostProvider";
import Card from "../style/card";

export default function PostForm({ threadId }) {
  const { user } = useContext(UserContext);
  const { addPost } = useContext(PostContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const post = getFormData();
    addPost(post);
  };

  const getFormData = () => {
    const data = {
      title: document.querySelector("#post-title").value,
      text: document.querySelector("#post-text").value,
      image: document.querySelector("#post-image").value,
      user: user.id,
      thread: Number(threadId),
      likes: [],
      comments: [],
    };

    clearFormData();

    return data;
  };

  const clearFormData = () => {
    document.querySelector("#post-title").value = null;
    document.querySelector("#post-text").value = null;
    document.querySelector("#post-image").value = null;
  };

  const postForm = (
    <form id="post-form" onSubmit={submitHandler}>
      <input type="hidden" />
      <input type="text" id="post-title" placeholder="Post title" required />
      <textarea name="" id="post-text" cols="30" rows="10" required></textarea>
      <input type="text" id="post-image" placeholder="Image URL" />
      <input type="submit"/>
    </form>
  );

  return <Card>{postForm}</Card>;
}
