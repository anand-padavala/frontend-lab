const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const dir = path.join(__dirname, "demo-files");
const bigFile = path.join(dir, "big-file.txt");
const outputFile = path.join(dir, "output.txt");
const upperFile = path.join(dir, "uppercase.txt");

// Setup: create directory and a large file
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

console.log("=== Creating a large file ===\n");
const writeStream = fs.createWriteStream(bigFile);
for (let i = 1; i <= 10000; i++) {
  writeStream.write(`Line ${i}: This is some sample data for streaming demo.\n`);
}
writeStream.end();
writeStream.on("finish", () => {
  const size = fs.statSync(bigFile).size;
  console.log(`Created ${bigFile}`);
  console.log(`File size: ${(size / 1024).toFixed(1)} KB\n`);
  runDemos();
});

function runDemos() {
  // --- 1. Readable Stream ---
  console.log("=== 1. Readable Stream ===\n");
  console.log("Why streams? Without streams:");
  console.log("  const data = fs.readFileSync('big-file.txt')  → loads ENTIRE file into memory");
  console.log("With streams:");
  console.log("  fs.createReadStream('big-file.txt')           → reads in small chunks\n");

  const readable = fs.createReadStream(bigFile, { encoding: "utf-8" });
  let chunkCount = 0;

  readable.on("data", (chunk) => {
    chunkCount++;
    if (chunkCount <= 2) {
      console.log(`  Chunk ${chunkCount}: ${chunk.length} characters`);
    }
  });

  readable.on("end", () => {
    console.log(`  Total chunks: ${chunkCount}\n`);

    // --- 2. Writable Stream ---
    demo2();
  });

  function demo2() {
    console.log("=== 2. Writable Stream ===\n");

    const writable = fs.createWriteStream(outputFile);

    writable.write("First line\n");
    writable.write("Second line\n");
    writable.write("Third line\n");
    writable.end("Last line\n"); // end() writes final data and closes

    writable.on("finish", () => {
      console.log(`  Written to ${outputFile}`);
      console.log(`  Content: ${fs.readFileSync(outputFile, "utf-8")}`);
      demo3();
    });
  }

  // --- 3. Pipe — connect readable to writable ---
  function demo3() {
    console.log("=== 3. Pipe (copy file via stream) ===\n");

    const src = fs.createReadStream(bigFile);
    const dest = fs.createWriteStream(path.join(dir, "copy.txt"));

    // pipe() automatically reads chunks from src and writes to dest
    src.pipe(dest);

    dest.on("finish", () => {
      console.log("  File copied using pipe!\n");
      demo4();
    });
  }

  // --- 4. Transform Stream — modify data as it flows ---
  function demo4() {
    console.log("=== 4. Transform Stream ===\n");

    const toUpperCase = new Transform({
      transform(chunk, encoding, callback) {
        // Convert each chunk to uppercase as it passes through
        callback(null, chunk.toString().toUpperCase());
      },
    });

    const src = fs.createReadStream(bigFile);
    const dest = fs.createWriteStream(upperFile);

    // Read → Transform → Write
    src.pipe(toUpperCase).pipe(dest);

    dest.on("finish", () => {
      // Show first 100 chars of the uppercase file
      const preview = fs.readFileSync(upperFile, "utf-8").slice(0, 100);
      console.log("  Transformed to uppercase:");
      console.log(`  ${preview}...\n`);
      demo5();
    });
  }

  // --- 5. Stream events ---
  function demo5() {
    console.log("=== 5. Stream Events ===\n");

    const stream = fs.createReadStream(bigFile);

    stream.on("open", () => console.log("  open    → file opened"));
    stream.on("data", () => {}); // consume data to trigger events
    stream.on("end", () => console.log("  end     → no more data"));
    stream.on("close", () => {
      console.log("  close   → stream closed");

      // Cleanup
      console.log("\n=== Cleanup ===\n");
      fs.unlinkSync(bigFile);
      fs.unlinkSync(outputFile);
      fs.unlinkSync(path.join(dir, "copy.txt"));
      fs.unlinkSync(upperFile);
      fs.rmdirSync(dir);
      console.log("  Deleted all demo files");

      console.log("\n=== Summary ===\n");
      console.log("  Readable  → reads data in chunks    (fs.createReadStream)");
      console.log("  Writable  → writes data in chunks   (fs.createWriteStream)");
      console.log("  Transform → modifies data in flight (new Transform)");
      console.log("  Pipe      → connects streams         (readable.pipe(writable))");
    });
  }
}
