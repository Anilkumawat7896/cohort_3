import express, { json } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
const JWT_SECRET = "thisisthesecretofjwt143";

const app = express();

const PORT = 3000;
app.use(express.json());

const users = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
function auth(req, res, next) {
  const token = req.headers["token"];
  const user = jwt.verify(token, JWT_SECRET);
  if (user.username) {
    req.username = user.username;
    next();
  } else {
    return res.status(411).send("please login again");
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "app.html"));
});
app.post("/sign-in", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user) {
    if (user.password === password) {
      const payload = {
        username: username,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "5h" });
      return res.status(200).json({
        message: "Welcome you are signed in successfully",
        token: token,
      });
    } else {
      return res.status(411).send("passward incorrect");
    }
  } else {
    return res.status(411).send("User not found");
  }
});

app.post("/sign-up", (req, res) => {
  const { username, password } = req.body;
  users.push({
    username: username,
    password: password,
  });
  return res.json({
    message: "you are signed up successfully , Thank you for visisting us.",
  });
});

app.get("/me", auth, (req, res) => {
  const username = req.username;

  const user = users.find((u) => u.username === username);

  if (user) {
    return res.status(200).json({
      payload: {
        username: user.username,
        password: user.password,
      },
    });
  } else {
    return res.status(411).send("User not found");
  }
});
app.listen(PORT, () => {
  console.log("server is up");
});
