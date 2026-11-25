const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

const posts = [];
const comments = [];
let nextPostId = 1;
let nextCommentId = 1;

const findPost = (id) => posts.find((p) => p.id === id);

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = findPost(Number(req.params.id));
  if (!post) return res.status(404).json({ error: "post not found" });
  res.json(post);
});

app.post("/posts", (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: "name and content are required" });
  }
  const post = { id: nextPostId++, name, content };
  posts.push(post);
  res.status(201).json(post);
});

app.get("/posts/:id/comments", (req, res) => {
  const postId = Number(req.params.id);
  if (!findPost(postId)) return res.status(404).json({ error: "post not found" });

  res.json(comments.filter((c) => c.postId === postId));
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = Number(req.params.id);
  if (!findPost(postId)) return res.status(404).json({ error: "post not found" });

  const { comment } = req.body;
  if (!comment) return res.status(400).json({ error: "comment is required" });

  const newComment = { id: nextCommentId++, postId, comment };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});