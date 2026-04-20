# Promise Lifecycle — How Promises Work Internally

## The Code

```js
simulatedFetch("/users/1", 4000)
  .then((response) => response.json())
  .then((user) => console.log(user.name));
```

---

## Phase 1: Creation (0.0s — synchronous, left to right)

Chaining builds 3 promises instantly. No async work yet.

```
simulatedFetch("/users/1")    .then((response) => ...)    .then((user) => ...)
         |                             |                          |
         v                             v                          v
    Promise #1                    Promise #2                  Promise #3
    (fetch)                       (first .then)               (second .then)
    state: pending                state: pending              state: pending
    onSuccess: --> #2             onSuccess: --> #3            onSuccess: null

    Waiting for                   Waiting for                 Waiting for
    OS thread                     #1 to resolve               #2 to resolve
```

---

## Phase 2: Resolution (4.0s — OS thread finishes)

### Step 1: Promise #1 resolves

OS thread returns the response. #1 is fulfilled.

```
    Promise #1
    state: fulfilled
    value: { ok: true, status: 200, json() {...} }
        |
        | runs onSuccess callback: (response) => response.json()
        v
```

### Step 2: Callback calls response.json() — creates Promise #4

`response.json()` parses the raw body string into a JS object.
Resolves immediately because data is already in memory.

```
    Promise #4 (NEW — created during resolution)
    state: fulfilled (immediately)
    value: { id: 1, name: "Anand", email: "anand@example.com" }
        |
        | #4 is returned from the callback
        | #2 sees: result instanceof MyPromise!
        | does: result.then(resolve) and result.catch(reject)
        v
```

### Step 3: Promise #5 created — unwraps #4 into #2

`result.then(resolve)` creates a helper promise that connects
#4's resolved value into #2's resolve function.

```
    Promise #5 (NEW — plumbing)
    purpose: connect #4's value --> #2's resolve
        |
        | #4 is already fulfilled
        | so immediately calls #2's resolve with #4's value
        v
```

### Step 4: Promise #2 resolves

Now #2 has the parsed user object.

```
    Promise #2
    state: fulfilled
    value: { id: 1, name: "Anand", email: "anand@example.com" }
        |
        | runs onSuccess callback: (user) => console.log(user.name)
        | prints: "Anand (anand@example.com)"
        | returns: undefined
        v
```

### Step 5: Promise #3 resolves

Last in the chain. Nobody uses this.

```
    Promise #3
    state: fulfilled
    value: undefined
    onSuccess: null (nobody chained after this)

    All done. All 5 promises garbage collected.
```

---

## Summary Table

| Promise | Created At | Purpose              | Actually Async?            |
|---------|-----------|----------------------|----------------------------|
| #1      | 0.0s      | fetch (network call) | YES (OS thread)            |
| #2      | 0.0s      | first .then()        | No  (plumbing for chain)   |
| #3      | 0.0s      | second .then()       | No  (plumbing for chain)   |
| #4      | 4.0s      | response.json()      | YES (stream read + parse)  |
| #5      | 4.0s      | unwraps #4 into #2   | No  (plumbing)             |

---

## Creation vs Resolution Order

```
Created at 0.0s (chaining):     #1 --> #2 --> #3
Created at 4.0s (resolution):   #4 --> #5

Resolved at 4.0s (in order):    #1 --> #4 --> #5 --> #2 --> #3
```

---

## Key Concepts

### Why does every .then() return a Promise?
So you can chain: `.then().then().catch()`. Without it, you'd get
`undefined.then()` which is an error.

### Why are there "plumbing" promises?
When your `.then()` callback returns a Promise (#4), the system needs
to unwrap it so the next `.then()` gets the actual value, not a
Promise object. #5 does this unwrapping.

### Why does resolve exist?
`resolve` = "the job is done, here's the result."
It changes the Promise from `pending` to `fulfilled` and triggers
any `.then()` callbacks that are waiting.

### What if .then() is called after the Promise already resolved?
The Promise remembers its value. `.then()` checks the state — if
already fulfilled, it runs the callback immediately. Nothing is lost.

### What happens to unused Promises?
They get garbage collected like any other JS object — once nothing
references them, they're cleaned up automatically.
