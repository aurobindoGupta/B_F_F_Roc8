import { posts } from "@/data/posts";


export default function handler(req,res){
    const  {id} = req.query;

    const post = posts.find((each)=>{
        return each.id == parseInt(id);
    })
    res.status(200).json(post)
}