import { MainLayout } from "@/layouts/MainLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/posts");
  const posts = await response.json();
  return {
    props: {
      posts,
    },
  };
}

export default function posts({ posts }) {
  return (
    <>
      <h1>Posts Page</h1>
      {posts.map((each, idx) => {
        return (
          <div key={idx.toString()}>
            <h2>{each.title}</h2>
            <p>{each.body}</p>
            <Link href={`/posts/${each.id}`}>Comments</Link>
          </div>
        );
      })}
    </>
  );
}

posts.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
