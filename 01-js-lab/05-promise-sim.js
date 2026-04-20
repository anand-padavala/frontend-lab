// ============================================================
// Promise Simulation — Build a Promise from scratch (simplified)
// Run: node 05-promise-sim.js
// ============================================================


// ---- Step 1: Our own Promise class ----

class MyPromise {
  constructor(executor) {
    this.state = "pending";       // "pending" | "fulfilled" | "rejected"
    this.value = undefined;       // the resolved value or rejection reason
    this.onSuccess = null;        // one .then() callback (stored for later)
    this.onFailure = null;        // one .catch() callback (stored for later)

    const resolve = (value) => {  // resolve is local function.  
      if (this.state !== "pending") return;  // can only settle once
      this.state = "fulfilled";
      this.value = value;
      console.log(`  [MyPromise] pending → fulfilled`);

      // If .then() was already called, run its callback now
      if (this.onSuccess) this.onSuccess(this.value);
    };

    const reject = (reason) => { // reject is a local function
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = reason;
      console.log(`  [MyPromise] pending → rejected (${reason})`);

      // If .catch() was already called, run its callback now
      if (this.onFailure) {
        this.onFailure(this.value);
      } else {
        console.log(`  [MyPromise] WARNING: Unhandled rejection!`);
      }
    };

    // The executor runs IMMEDIATELY
    executor(resolve, reject);
  }

  then(callback) {
    return new MyPromise((resolve, reject) => {

      const handleSuccess = (value) => {
        try {
          const result = callback(value);
          // If callback returns a MyPromise, wait for it
          if (result instanceof MyPromise) {
            result.then(resolve);
            result.catch(reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err.message);
        }
      };

      if (this.state === "fulfilled") {
        // Already resolved — run callback right away
        handleSuccess(this.value);
      } else if (this.state === "rejected") {
        // Already rejected — pass rejection to the next .catch()
        reject(this.value);
      } else {
        // Still pending — save callback for later
        this.onSuccess = handleSuccess;
        this.onFailure = (reason) => reject(reason);
      }
    });
  }

  catch(callback) {
    return new MyPromise((resolve, reject) => {

      const handleFailure = (reason) => {
        try {
          const result = callback(reason);
          if (result instanceof MyPromise) {
            result.then(resolve);
            result.catch(reject);
          } else {
            resolve(result);  // .catch() returning a value "recovers" the chain
          }
        } catch (err) {
          reject(err.message);
        }
      };

      if (this.state === "rejected") {
        handleFailure(this.value);
      } else if (this.state === "pending") {
        this.onFailure = handleFailure;
      }
    });
  }

}


// ---- Step 2: Simulated OS/Browser network layer ----
// In reality this is C++/Rust code, NOT JavaScript.
// We simulate it with setTimeout.

// In reality, this data lives on a remote server.
// The server sends it as a raw JSON string over the network.
const fakeDatabase = {
  "/users/1": '{"id":1,"name":"Anand","email":"anand@example.com"}',
  "/users/2": '{"id":2,"name":"Bob","email":"bob@example.com"}',
  //           ^^ raw strings, NOT objects — just like real HTTP response body
};

function nativeNetworkThread(url, delayMs, onComplete) {
  console.log(`  [OS Thread] ← Thread spawned for: ${url}`);

  // setTimeout simulates work on a separate OS thread
  setTimeout(() => {
    console.log(`  [OS Thread] → Response received for: ${url}`);

    const rawBody = fakeDatabase[url];  // raw string, like real network data
    if (rawBody) {
      console.log(`  [OS Thread]   Raw body: ${rawBody}`);
      onComplete(null, { status: 200, body: rawBody });
      //                               ^^^^ a string, not a JS object
    } else {
      onComplete(null, { status: 404, body: '{"error":"Not found"}' });
    }
  }, delayMs);
}


// ---- Step 3: Simulated fetch ----
// Creates a Promise and hands work off to a native thread.

function simulatedFetch(url, delayMs = 10000) {
  console.log(`\n  [fetch] Called for: ${url}`);

  return new MyPromise((resolve, reject) => {
    // This is where the OS thread starts
    nativeNetworkThread(url, delayMs, (error, response) => {
      // OS thread finished — we're back in JavaScript
      if (error) {
        reject(error);
        return;
      }

      resolve({
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json() {
          // Returns a Promise FIRST, then reads & parses inside
          return new MyPromise((resolve, reject) => {
            // This is what .json() actually does:
            // 1. Read the raw body from the stream (already in memory buffer)
            // 2. Parse the string into a JS object
            console.log(`  [response.json()] Reading body from stream...`);
            console.log(`  [response.json()] Raw string: ${response.body} (type: ${typeof response.body})`);
            const parsed = JSON.parse(response.body);
            console.log(`  [response.json()] Parsed:`, parsed, `(type: ${typeof parsed})`);
            resolve(parsed);
          });
        },
      });
    });

    console.log(`  [fetch] → Handed off to OS. Promise returned (pending).\n`);
  });
}


// ---- Step 4: Run the demo ----

console.log("============================================");
console.log("  Promise Simulation Demo");
console.log("============================================\n");

const startTime = Date.now();
function elapsed() {
  return ((Date.now() - startTime) / 1000).toFixed(1) + "s";
}

// Demo 1: Successful fetch
console.log(`[${elapsed()}] calling fetch("/users/1")...`);

simulatedFetch("/users/1", 4000)
  .then((response) => {
    console.log(`\n[${elapsed()}] .then() #1: got response, status: ${response.status}`);
    return response.json();
  })
  .then((user) => {
    console.log(`[${elapsed()}] .then() #2: ${user.name} (${user.email})`);
  });

// Demo 2: Failed fetch
console.log(`[${elapsed()}] calling fetch("/users/999")...`);

simulatedFetch("/users/999", 7000)
  .then((response) => {
    console.log(`\n[${elapsed()}] .then(): got response, status: ${response.status}`);
    if (!response.ok) throw new Error("Not found: " + response.status);
    return response.json();
  })
  .catch((err) => {
    console.log(`[${elapsed()}] .catch(): ${err}`);
  });

// This proves JavaScript is not blocked
console.log(`\n[${elapsed()}] >>> This runs FIRST! JS is not blocked.\n`);
