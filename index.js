import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import localize from "./routes/localize.route";
import LocationDAO from "./data-access/locationDAO";

dotenv.config();
const app = express();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NS;
const port = process.env.PORT || 8002;

MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async (client) => {
    console.log("MongoDB connected");
    await LocationDAO.injectDB(client);
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB: ", e.stack);
    process.exit(1);
  });

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/localize", localize);

app.use("*", (req, res) => {
  res.status(404).json({ error: "API not found" });
});

app.listen(port, () => {
  console.log(`  🚀 location service launching on port ${port}`);
});

export default app;
