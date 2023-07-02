import { posts } from "@/data/posts";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(posts);
    return;
  } else if (req.method === "POST") {
    //create post logic
    // console.log(req.body);
    const id = posts.length + 1;
    const newPost = {
        id,
        ...req.body
    }
    posts.push(newPost);
    res.status(200).json(newPost);
    return;
  }
  res.status(404).send("not found");
  return;
}
