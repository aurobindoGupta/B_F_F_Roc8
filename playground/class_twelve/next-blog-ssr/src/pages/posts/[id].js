import { MainLayout } from "@/layouts/MainLayout";
import { posts } from "@/data/posts";
import { comments } from "@/data/comments";

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;

  const post = posts.find((each) => {
    return each.id === parseInt(id);
  });

  const comment = comments.find((each) => {
    return each.postId === parseInt(id);
  });

  return {
    props: {
      post,
      comment,
    },
  };
}

export default function post({ post, comment }) {
  return (
    <>
      <h1>Individual Post Page! Post: {post.id}</h1>
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
