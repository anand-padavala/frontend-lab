const EventEmitter = require("events");

// --- 1. Basic EventEmitter ---
console.log("=== 1. Basic Events ===\n");

const emitter = new EventEmitter();

// Listen for an event
emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Fire the event
emitter.emit("greet", "Anand");
emitter.emit("greet", "John");

// --- 2. Multiple listeners on same event ---
console.log("\n=== 2. Multiple Listeners ===\n");

emitter.on("login", (user) => console.log(`${user} logged in`));
emitter.on("login", (user) => console.log(`Send welcome email to ${user}`));
emitter.on("login", (user) => console.log(`Log: ${user} login at ${new Date().toLocaleTimeString()}`));

emitter.emit("login", "Anand");

// --- 3. once — listener runs only one time ---
console.log("\n=== 3. Once ===\n");

emitter.once("init", () => console.log("App initialized"));

emitter.emit("init"); // prints
emitter.emit("init"); // nothing — listener already removed

// --- 4. Removing listeners ---
console.log("\n=== 4. Remove Listener ===\n");

function onMessage(msg) {
  console.log("Message:", msg);
}

emitter.on("message", onMessage);
emitter.emit("message", "first");  // prints

emitter.off("message", onMessage); // remove the listener
emitter.emit("message", "second"); // nothing — listener removed

// --- 5. Real-world example: Order System ---
console.log("\n=== 5. Order System ===\n");

class OrderSystem extends EventEmitter {
  placeOrder(item, qty) {
    console.log(`Order placed: ${qty}x ${item}`);
    this.emit("order", { item, qty });
  }

  cancelOrder(item) {
    console.log(`Order cancelled: ${item}`);
    this.emit("cancel", { item });
  }
}

const shop = new OrderSystem();

// Different parts of the system react to events
shop.on("order", (order) => {
  console.log(`  → Inventory: reserve ${order.qty}x ${order.item}`);
});

shop.on("order", (order) => {
  console.log(`  → Email: "Your order for ${order.item} is confirmed"`);
});

shop.on("order", (order) => {
  console.log(`  → Analytics: track order for ${order.item}`);
});

shop.on("cancel", (order) => {
  console.log(`  → Inventory: release ${order.item}`);
});

shop.on("cancel", (order) => {
  console.log(`  → Email: "Your order for ${order.item} has been cancelled"`);
});

shop.placeOrder("Laptop", 1);
console.log();
shop.placeOrder("Mouse", 3);
console.log();
shop.cancelOrder("Mouse");

// --- 6. Error event ---
console.log("\n=== 6. Error Event ===\n");

emitter.on("error", (err) => {
  console.log("Caught error:", err.message);
});

emitter.emit("error", new Error("Something went wrong"));
// Without the error listener above, this would crash the program!
