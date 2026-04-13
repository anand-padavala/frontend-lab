// ============================================================
// FiberNode — Full Lifecycle Simulation
// Run: node 10-fiberNode-full-lifecycle.js
// ============================================================
// Two phases in React:
//
// RENDER PHASE (can be paused/restarted by React):
//   → component function runs
//   → hooks execute
//   → JSX produced
//   → reconciliation (diff old output vs new output)
//   → bailout if nothing changed
//
// COMMIT PHASE (synchronous, cannot be interrupted):
//   → DOM updates applied
//   → useLayoutEffect runs (before browser paint)
//   → browser paints the screen
//   → useEffect runs (after browser paint)
// ============================================================

class FiberNode {
  constructor(name, componentFn, props = {}) {
    this.name = name;
    this.componentFn = componentFn;
    this.props = props;
    this.state = {};
    this.mounted = false;
    this.prevOutput = null;
    this.output = null;
    this.layoutEffects = [];
    this.effects = [];
    this.pendingStateUpdates = [];
    console.log(`[${this.name}] CREATED — fiber node initialized`);
  }

  // ---- MOUNT ----
  mount() {
    console.log(`\n[${this.name}] ===== MOUNT =====`);
    this.mounted = true;
    this._renderPhase();
    this._commitPhase(true);
  }

  // ---- STATE UPDATE (batched) ----
  setState(update) {
    console.log(`[${this.name}] setState queued:`, update);
    this.pendingStateUpdates.push(update);
  }

  // Process all queued state updates in one re-render
  flush() {
    if (this.pendingStateUpdates.length === 0) return;

    console.log(`\n[${this.name}] ===== UPDATE (batched ${this.pendingStateUpdates.length} setState calls) =====`);

    // Batching — apply all pending updates at once
    console.log(`[${this.name}] [batch] merging ${this.pendingStateUpdates.length} updates into one render`);
    for (const update of this.pendingStateUpdates) {
      this.state = { ...this.state, ...update };
    }
    this.pendingStateUpdates = [];

    this._renderPhase();

    // Bailout — skip commit if output didn't change
    if (JSON.stringify(this.output) === JSON.stringify(this.prevOutput)) {
      console.log(`[${this.name}] [bailout] output unchanged — skipping commit phase`);
      return;
    }

    this._commitPhase(false);
  }

  // ---- PROPS UPDATE ----
  updateProps(newProps) {
    console.log(`\n[${this.name}] ===== PROPS UPDATE =====`);
    this.props = { ...this.props, ...newProps };
    this._renderPhase();

    if (JSON.stringify(this.output) === JSON.stringify(this.prevOutput)) {
      console.log(`[${this.name}] [bailout] output unchanged — skipping commit phase`);
      return;
    }

    this._commitPhase(false);
  }

  // ---- UNMOUNT ----
  unmount() {
    console.log(`\n[${this.name}] ===== UNMOUNT =====`);
    console.log(`[${this.name}] [cleanup] all useEffect cleanups run`);
    console.log(`[${this.name}] [cleanup] timers cleared, subscriptions cancelled, listeners removed`);
    this.mounted = false;
    this.output = null;
    this.prevOutput = null;
    console.log(`[${this.name}] component removed from DOM`);
  }

  // ---- RENDER PHASE (can be paused in real React) ----
  _renderPhase() {
    console.log(`[${this.name}] ── render phase ──`);

    // Step 1: Run component function
    console.log(`[${this.name}]   [run] component function executes`);
    console.log(`[${this.name}]     props:`, this.props);
    console.log(`[${this.name}]     state:`, this.state);
    this.prevOutput = this.output;
    this.output = this.componentFn(this.props, this.state);
    console.log(`[${this.name}]     output:`, this.output);

    // Step 2: Reconciliation (diffing)
    if (this.prevOutput) {
      console.log(`[${this.name}]   [reconcile] diffing old vs new output`);
      const changes = [];
      for (const key of Object.keys(this.output)) {
        if (this.output[key] !== this.prevOutput[key]) {
          changes.push(`${key}: "${this.prevOutput[key]}" → "${this.output[key]}"`);
        }
      }
      if (changes.length > 0) {
        console.log(`[${this.name}]     changes found:`, changes);
      } else {
        console.log(`[${this.name}]     no changes found`);
      }
    } else {
      console.log(`[${this.name}]   [reconcile] first render — no previous output to diff`);
    }
  }

  // ---- COMMIT PHASE (synchronous, cannot be interrupted) ----
  _commitPhase(isMount) {
    console.log(`[${this.name}] ── commit phase ──`);

    // Step 1: Apply DOM updates
    console.log(`[${this.name}]   [DOM] changes applied to real DOM`);

    // Step 2: useLayoutEffect (runs BEFORE paint, synchronous)
    if (isMount) {
      console.log(`[${this.name}]   [useLayoutEffect] runs (before paint) — measure DOM, sync adjustments`);
    } else {
      console.log(`[${this.name}]   [useLayoutEffect] cleanup prev → run new (before paint)`);
    }

    // Step 3: Browser paints
    console.log(`[${this.name}]   [paint] browser paints the screen — user sees the update`);

    // Step 4: useEffect (runs AFTER paint, asynchronous)
    if (isMount) {
      console.log(`[${this.name}]   [useEffect] runs (after paint) — fetch data, subscribe, start timers`);
    } else {
      console.log(`[${this.name}]   [useEffect] cleanup prev → run new (after paint)`);
    }
  }
}

// ============================================================
// A simple component function
// ============================================================
function Header(props, state) {
  return {
    text: `Welcome ${props.user}!`,
    theme: props.theme,
    menuOpen: state.menuOpen || false,
  };
}

// ============================================================
// Run the full lifecycle
// ============================================================

console.log("╔══════════════════════════════════════╗");
console.log("║   React Fiber Lifecycle Simulation   ║");
console.log("╚══════════════════════════════════════╝");

// 1. Create and mount
const fiber = new FiberNode("Header", Header, { user: "Anand", theme: "light" });
fiber.mount();

// 2. Multiple setState calls — batched into one render
console.log("\n>>> User clicks menu + toggles dark mode simultaneously");
fiber.setState({ menuOpen: true });
fiber.setState({ darkMode: true });
fiber.flush();  // both updates applied in one render

// 3. Props update
console.log("\n>>> Parent passes new theme prop");
fiber.updateProps({ theme: "dark" });

// 4. Bailout — same props, no change
console.log("\n>>> Parent re-renders but passes same props");
fiber.updateProps({ theme: "dark" });  // should bailout

// 5. Bailout — setState with same value
console.log("\n>>> setState with same value");
fiber.setState({ menuOpen: true });  // already true
fiber.flush();  // should bailout

// 6. Unmount
console.log("\n>>> User navigates away");
fiber.unmount();

// ============================================================
// Timeline summary:
//
//   mount:
//     render phase → commit phase (DOM + layoutEffect + paint + effect)
//
//   update (setState / new props):
//     batch setState → render phase → reconcile (diff) →
//       if changed: commit phase
//       if unchanged: bailout (skip commit)
//
//   unmount:
//     cleanup all effects → remove from DOM
//
//   useLayoutEffect vs useEffect:
//     useLayoutEffect: runs BEFORE paint (synchronous, blocks paint)
//     useEffect: runs AFTER paint (asynchronous, doesn't block)
// ============================================================
