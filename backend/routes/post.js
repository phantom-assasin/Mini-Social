var express = require("express");
var router = express.Router();
var { PrismaClient } = require("@prisma/client");

var { postSchema } = require("../schema/Post");

var prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const post = await prisma.post.create({ data: value });
  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    // include: { comments: true },
  });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { comments: true },
  });

  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

router.put("/:id", async (req, res) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const post = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: value,
    });
    res.json(post);
  } catch {
    res.status(404).json({ error: "Post not found" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Post deleted" });
  } catch {
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/:id/comments", async (req, res) => {
  const { error, value } = commentSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const comment = await prisma.comment.create({
      data: {
        content: value.content,
        postId: Number(req.params.id),
      },
    });
    res.json(comment);
  } catch {
    res.status(404).json({ error: "Post not found" });
  }
});

module.exports = router;
