import express from "express";

const app = express();
const PORT = 3000;

// function isOldEnough(age) {
//   if (age >= 14) {
//     return true;
//   } else {
//     return false;
//   }
// }

function isOldEnoughMiddlewere(req, res, next) {
  if (req.query.age >= 14) {
    // allowed
    next();
  } else {
    // not allowed
    res.json({
      msg: "Sorry, you are under age",
    });
  }
}
app.get("/ride1", isOldEnoughMiddlewere, (req, res) => {
  res.json({
    msg: "You have successfully accessed the ride 1 . Thank you for your patenince.",
  });
});

app.get("/ride2", isOldEnoughMiddlewere, (req, res) => {
  res.json({
    mag: "You have successfully riden the ride 2.",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
