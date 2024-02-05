import { createContext, useEffect, useState, useContext } from "react";
import { ThreadContext } from "../threads/ThreadProvider";

// create context
export const PostContext = createContext();

// provide post info for other components.
export default function PostProvider(props) {
  // import currentThread for getting related posts.
  const { currentThread } = useContext(ThreadContext);
  const [posts, setPosts] = useState([]);

  // when the currentThread changes, get its posts
  useEffect(() => {
    if (currentThread) {
      getPostsByThreadId(currentThread.id);
    }
  }, [currentThread]);

  // get all posts. May not use since all posts are not needed.
  // const getPosts = () => {
  //   return fetch("http://localhost:8088/posts")
  //     .then((response) => response.json())
  //     .then((response) => setPosts(response));
  // };

  // get all posts for given thread
  const getPostsByThreadId = (threadId) => {
    return fetch(`http://localhost:8088/posts?thread=${threadId}`)
      .then((response) => response.json())
      .then((response) => setPosts(response));
  };

  // get a specific post by id
  const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`).then((response) => response.json());
  };

  // add a post
  const addPost = (post) => {
    return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }); //.then(getPosts);
  };

  // delete a post
  const deletePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
      method: "DELETE",
    }); //.then(getPosts);
  };

  // update a post
  const updatePost = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }); //.then(getPosts);
  };

  // create provider
  return (
    <PostContext.Provider
      value={{ posts, setPosts, addPost, getPostById, getPostsByThreadId, deletePost, updatePost }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
