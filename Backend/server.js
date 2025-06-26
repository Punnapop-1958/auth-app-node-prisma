import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoute from "./routes/auth.route.js";

const app = express();

app.use(cors()); //Allow cross domain
app.use(morgan("dev")); //Show logs
app.use(express.json());

//Routing
app.use("/auth", authRoute);

//Error handing
app.use((err, req, res, next) => {
  res.status(err.code || 500).json({ message: err.message || "Server Error" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
