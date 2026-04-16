class MiniPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.thenFn = null;

    const resolve = (val) => {
      this.state = "fulfilled";
      this.value = val;

      if (this.thenFn) {
        this.thenFn(val);
      }
    };

    executor(resolve);
  }

  then(fn) {
    this.thenFn = fn;

    if (this.state === "fulfilled") {
      fn(this.value);
    }
  }
}

console.log("A");

const p = new MiniPromise((resolve) => {
  console.log("B");
  resolve(10);
});

p.then((val) => {
  console.log("C", val);
});

console.log("D");
