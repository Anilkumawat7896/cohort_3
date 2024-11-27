import express from "express";
const app = express();

function calculate(n) {
  let ans = 0;

  for (let i = 0; i <= n; i++) {
    ans += i;
  }
  return ans;
}
app.get("/",  (req, res) => {
  // let n = req.query.n;
  let { n } = req.query;
  // console.log(req.query);
  let ans = calculate(n);
  res.send(`${ans}`);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:3000");
});
