const express = require("express");
const cors = require("cors");

const codeforcesRoutes = require("./routes/codeforcesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/codeforces", codeforcesRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});