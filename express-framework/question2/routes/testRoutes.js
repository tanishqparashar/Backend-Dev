import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello, response time middleware working!" });
});

router.get("/slow", (req, res) => {
  setTimeout(() => {
    res.json({ message: "This route is slow" });
  }, 2000);
});

export default router;