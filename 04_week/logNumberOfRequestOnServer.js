import express from "express";

const app = express();

const PORT = 3000;

let numberOfRequest = 0;

// function countServerRequest(req, res, next) {
//   numberOfRequest += 1;
//   console.log("in the count server request middlewere and the request count is : "+numberOfRequest);
//   next();
// }

app.use(function (req, res, next) {
    numberOfRequest += 1;
    console.log("in the count server request middlewere and the request count is : "+numberOfRequest);
    next();
  });

app.get("/user", (req, res) => {
  console.log("in the user and the request count is : "+numberOfRequest);

  res.json({
    msg: "You are in the user route",
    "Number of request is ": numberOfRequest,
  });
});

app.get("/count", (req, res) => {
  console.log("in the count route and the request count is : "+numberOfRequest);

  res.json({
    msg: "You are in the count  route",
    "Number of request is ": numberOfRequest,
  });
});

app.listen(PORT, () => {
  console.log("server has started.");
});
