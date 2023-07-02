import { comments } from "@/data/comments";

export default function handler(req, res) {
  const { postId } = req.query;
  console.log({ postId });
  const comment = comments.find((each) => {
    return each.postId === parseInt(postId);
  });

  res.status(200).json(comment);
}
