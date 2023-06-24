import { useRouter } from "next/router";
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect } from "react";
import { useState } from "react";

export default function post() {
  const { query } = useRouter();
  const [post, setPost] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    if(query.id)
    fetch(`http://localhost:3000/api/post/${query.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      }).catch(console.error);
    if (query.id)
      fetch(`http://localhost:3000/api/comments?postId=${query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setComment(data);
        }).catch(console.error);
  }, [query.id]);

  return (
    <>
      <h1>Individual Post Page! Post: {query.id}</h1>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ) : null}
      {comment ? (
        <>
          <h3>Comments!</h3>
          <div>
            <p>
              {comment.name}, {comment.email}
            </p>
            <p>{comment.body}</p>
          </div>
        </>
      ) : null}
    </>
  );
}

post.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
