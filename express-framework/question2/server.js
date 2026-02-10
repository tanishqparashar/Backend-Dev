import express from "express";
import responseTimeLogger from "./middleware/responseTimeLogger.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();
app.use(express.json());


app.use(responseTimeLogger);


app.use("/api/test", testRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});