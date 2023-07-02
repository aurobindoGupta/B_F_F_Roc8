"use client";

import { useState } from "react";

export default function newPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onTitleChange = (e) => {
   
    setTitle(e.target.value);
  };

  const onBodyChange = (e) => {
    setBody(e.target.value);
  };

  const createPost = async (e) => {
    e.preventDefault();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    if (json) {
      alert("Post created!");
    }
    console.log(json.body)
  };

  return (
    <div>
      <form onSubmit={createPost}>
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="title"
          name="title"
        />
        <br />
        <textarea
          value={body}
          onChange={onBodyChange}
          name="body"
          placeholder="new post"
        />
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
