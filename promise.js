const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

promise1.then(value => {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]

/*
  Demonstrate how Promise works
*/
const promise2 = msg =>
  new Promise((resolve, reject) => {
    console.log("msg: " + msg);
    if (msg === "1") {
      resolve(msg);
    } else {
      reject("Not 1");
    }
  });

promise2("1")
  .then(data => {
    console.log("data: " + data);
    return parseInt(data) + 100;
  })
  .then(data => {
    console.log("data-rev: " + data);
  })
  .catch(err => {
    console.log("Error: " + err);
  });

promise2("2")
  .then(data => console.log("data: " + data), err => console.log("err: " + err))
  .catch(err => {
    console.log("Error: " + err);
  });

promise2("3")
  .then(data => console.log("data: " + data))
  .catch(err => {
    console.log("Error: " + err);
  });

/*
The arguments to then are optional, and catch(failureCallback) 
is short for then(null, failureCallback). 

Important: Always return results, otherwise callbacks won't catch the result of 
a previous promise (with arrow functions () => x is short for () => { return x; }).

Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations.

The first mistake is to not chain things together properly. This happens when we create a new promise but forget to return it. As a consequence, the chain is broken, or rather, we have two independent chains racing.

The second mistake is to nest unnecessarily, enabling the first mistake. Nesting also limits the scope of inner error handlers, which—if unintended—can lead to uncaught errors.

The third mistake is forgetting to terminate chains with catch. Unterminated promise chains lead to uncaught promise rejections in most browsers.

A good rule-of-thumb is to always either return or terminate promise chains, and as soon as you get a new promise, return it immediately, to flatten things
*/

const promise = msg =>
  new Promise((resolve, reject) => {
    console.log("msg: " + msg);
    if (msg === "asyc-test") {
      resolve(msg);
    } else {
      reject("asyc-test not matched");
    }
  });

async function asyncCall(msg) {
  console.log("** asyncCall starts");
  await promise(msg)
    .then(data => console.log("Async Data: " + data))
    .catch(err => {
      console.log("Async ERROR: " + err);
    });
  console.log("** asyncCall ends");
}

asyncCall("asyc-test");
asyncCall("asyc-test-again");
