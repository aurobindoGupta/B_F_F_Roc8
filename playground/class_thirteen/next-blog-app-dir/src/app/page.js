import Link from "next/link";

export default async function Home() {
  const postsResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = await postsResponse.json();
  return (
    <div>
      <p>My page</p>
      <h1>Posts Page</h1>
      {posts.map((each, idx) => {
        return (
          <div>
            <h2>{each.title}</h2>
            <p>{each.body}</p>
            <Link href={`/posts/${each.id}`}>Comments</Link>
          </div>
        );
      })}
    </div>
  );
}
