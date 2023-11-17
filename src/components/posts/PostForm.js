import { useContext } from "react";
import { UserContext } from "../users/UserProvider";
import Card from "../style/card";

export default function PostForm({ threadId }) {
  const { user } = useContext(UserContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = getFormData();
    console.log(data);
  };

  const getFormData = () => {
    const data = {
      title: document.querySelector("#post-title").value,
      text: document.querySelector("#post-text").value,
      image: document.querySelector("#post-image").value,
      user: user.id,
      thread: threadId,
      likes: [],
      comments: [],
    };

    return data;
  };

  return (
    <Card>
      <form id="post-form" onClick={submitHandler}>
        <input type="hidden" />
        <input type="text" id="post-title" placeholder="Post title" />
        <input type="text" id="post-text" placeholder="Post body" />
        <input type="text" id="post-image" placeholder="Image URL" />
        <button>Submit</button>
      </form>
    </Card>
  );
}
