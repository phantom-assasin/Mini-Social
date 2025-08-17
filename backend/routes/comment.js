var express = require("express");
var router = express.Router();
var { PrismaClient } = require("@prisma/client");

var prisma = new PrismaClient();

router.delete("/:id", async (req, res) => {
  try {
    await prisma.comment.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Comment deleted" });
  } catch {
    res.status(404).json({ error: "Comment not found" });
  }
});

module.exports = router;
