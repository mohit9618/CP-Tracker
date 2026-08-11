require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const codeforcesRoutes = require("./routes/codeforcesRoutes");
const contestRoutes = require("./routes/contestRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const analyticsRoutes = require("./routes/analyticsRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/codeforces", codeforcesRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/recommendations",recommendationRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.get("/api/test", (req, res) => {
  res.send("TEST WORKING");
});

const PORT = 5000;
app.get("/api/test", (req, res) => {
  res.send("HELLO MOHIT");
});
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server not started because MongoDB connection failed");
  }
}



startServer();

