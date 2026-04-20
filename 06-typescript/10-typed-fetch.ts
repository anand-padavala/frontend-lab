// ============================================================
// 10 — Typed API Fetch (Real-world example)
// Run: npx ts-node 10-typed-fetch.ts
// ============================================================

console.log("=== Typed API Fetch ===\n");

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPost(id: number): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("HTTP error: " + res.status);
  const post: Post = await res.json();
  return post;
}

fetchPost(1).then((post) => {
  console.log("Title:", post.title);
  console.log("Body:", post.body.slice(0, 50) + "...");
  // post.title is guaranteed to be a string
  // post.id is guaranteed to be a number
  // TypeScript catches mistakes at compile time
});
