import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export default function PostProvider() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    return fetch("http://localhost:8088/posts")
      .then((response) => response.json())
      .then((response) => setPosts(response));
  };

  const addPost = (post) => {
    return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getPosts);
  };
}
