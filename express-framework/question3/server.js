import express from "express";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();


app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.use("/", contactRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});