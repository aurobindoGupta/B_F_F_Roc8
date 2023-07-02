export default function newPost() {
  async function createPost(data) {
    "use server";
    const title = data.get("title");
    const post = data.get('post')

   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: post,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
     const json = await response.json();
     console.log({ json });
     
  }
  return (
    <div>
      <form action={createPost}>
        <input type="text" name="title" placeholder="title" />
        <br />
        <textarea name="post" placeholder="new post" />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
