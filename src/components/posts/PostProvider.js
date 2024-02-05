import { createContext, useEffect, useState, useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";

export const PostContext = createContext();

export default function PostProvider(props) {
  const { currentThread } = useContext(ThreadContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentThread) {
      getPostsByThreadId(currentThread.id);
    }
  }, [currentThread]);

  // const getPosts = () => {
  //   return fetch("http://localhost:8088/posts")
  //     .then((response) => response.json())
  //     .then((response) => setPosts(response));
  // };

  const getPostsByThreadId = (threadId) => {
    return fetch(`http://localhost:8088/posts?thread=${threadId}`)
      .then((response) => response.json())
      .then((response) => setPosts(response));
  };

  const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`).then((response) => response.json());
  };

  const addPost = (post) => {
    return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }); //.then(getPosts);
  };

  const deletePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
      method: "DELETE",
    }); //.then(getPosts);
  };

  const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }); //.then(getPosts);
  };

  return (
    <PostContext.Provider
      value={{ posts, setPosts, addPost, getPostById, getPostsByThreadId, deletePost, updatePost }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
