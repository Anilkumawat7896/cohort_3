// Promises

// promise means that it will give us something in the future in programming that it is

//todo 1. first how to use a Promise

function promisifiedFunction(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function callThisFunction() {
  console.log("I have been called when the promise is resolved");
}
promisifiedFunction(3000).then(callThisFunction);

//todo 2. second how to write promises

