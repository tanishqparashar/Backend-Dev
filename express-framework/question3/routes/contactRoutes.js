import express from "express";

const router = express.Router();


router.get("/contact", (req, res) => {
  res.render("contact");
});


router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Contact Form Data:", { name, email, message });


  res.render("success", { name });
});

export default router;