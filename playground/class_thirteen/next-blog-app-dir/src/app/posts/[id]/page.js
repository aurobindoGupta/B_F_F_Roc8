export default async function Postpage({ params }) {
  const { id } = params;

  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await postResponse.json();

  const commentResponse = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  const comments = await commentResponse.json();

  return (
    <>
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      <h3>Comments!</h3>
      {comments.map((comment) => {
        return (
          <div>
            <p>
              <b>{comment.name}</b>, {comment.email}
            </p>
            <p>{comment.body}</p>
          </div>
        );
      })}
    </>
  );
}
