import express from "express";
import mainRoutes from "./routes/mainRoutes.js";

const app = express();


app.set("view engine", "ejs");


app.use("/", mainRoutes);


app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});