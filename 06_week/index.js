import express from "express";
const app = express();

const PORT = 3000;

app.use(express.json());

const users = [];

function generateToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}

app.post("/sign-in", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find((u) => u.username === username);
  if (user) {
    if (user.password === password) {
      const token = generateToken();
      user.token = token;
      return res.status(200).json({
        message: "you are successfully logged in ",
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Password is incorrect ",
      });
    }
  } else {
    return res.status(401).json({
      message: "username is incorrect ",
    });
  }
});

app.post("/sign-up", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!users.find((u) => u.username === username)) {
    users.push({
      username: username,
      password: password,
    });
    return res.status(200).json({
      message: "you are sign up successfully",
    });
  } else {
    return res.status(409).json({
      message: "username already exists ",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers["token"];

  const user = users.find((u) => u.token === token);

  if (user) {
    return res.status(200).json({
      username: user.username,
      message: `welcome ${user.username}`,
    });
  } else {
    return res.status(401).json({
      message: "User is not authorized",
    });
  }
});

app.listen(PORT, () => {
  console.log("server is up");
});
