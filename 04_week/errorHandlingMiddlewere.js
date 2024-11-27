import express from "express";

const app = express();

const PORT = 3000;

let rateLimiterForRequests = {};

setInterval(() => {
  rateLimiterForRequests = {};
}, 1000);

function rateLimiterMiddlewere(req, res, next) {
  const userId = req.header("user-id");
    if (!userId) {
      return res.status(400).send("user id is required");
    }
  if (rateLimiterForRequests[userId]) {
    rateLimiterForRequests[userId] += 1;
    // check the max reqests
    if (rateLimiterForRequests[userId] > 5) {
      throw new Error("Bas kar bhai kitna thokega");
      return res.status(429).send("to many requests");
    } else {
      next();
    }
  } else {
    rateLimiterForRequests[userId] = 1;
    return next();
  }
}

function errorHandlingMiddlewere(err, req, res, next) {
  console.log("error has occered", err.message);
  res.status(500).send("something went wrong");
}

app.use(rateLimiterMiddlewere);
app.get("/user", (req, res) => {
  res.json({
    msg: "in the user route",
  });
});

app.get("/park", (req, res) => {
  res.json({
    msg: "you are in the park",
  });
});

app.use(errorHandlingMiddlewere);

app.listen(PORT, () => {
  console.log("server has started");
});
