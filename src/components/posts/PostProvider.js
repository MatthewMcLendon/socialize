import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export default function PostProvider(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    return fetch("http://localhost:8088/posts")
      .then((response) => response.json())
      .then((response) => setPosts(response));
  };

  const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`).then((response) =>
      response.json()
    );
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

  const deletePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
      method: "DELETE",
    }).then(getPosts);
  };

  const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getPosts);
  };

  return (
    <PostContext.Provider
      value={{ posts, addPost, getPostById, deletePost, updatePost }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
