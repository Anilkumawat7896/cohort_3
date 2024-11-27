import express from "express";

const app = express();

const PORT = 3000;

let rateLimiterForUsers = {};

setInterval(() => {
  rateLimiterForUsers = {};
}, 1000);

// make a rate limiter global middlewere here
//user will send their user id in the header which will be like this ['user-id']
app.use(function (req, res, next) {
  let userId = req.headers["user-id"];

  if (rateLimiterForUsers[userId]) {
    rateLimiterForUsers[userId] = rateLimiterForUsers[userId] + 1;
    if (rateLimiterForUsers[userId] > 5) {
      res.status(404).send("sorry can not access this page at this rate");
    } else {
      next();
    }
  } else {
    rateLimiterForUsers[userId] = 1;
    next();
  }
});

app.get("/user", (req, res) => {
  res.json({
    msg: "in the user route",
  });
});

app.get("/rate-limiter", (req, res) => {
  res.json({
    msg: "in the rate limiter route",
  });
});

app.listen(PORT, () => {
  console.log("server has started yes it is started");
});
