# Frontend Learning Lab

A step-by-step learning path from HTML/browser fundamentals to React hooks, built through hands-on exercises.

---

## Learning Path

### 1. HTML & Browser Fundamentals — `00-html-lab/`

Understand how the browser works under the hood before writing any JavaScript.

| File | Topic |
|------|-------|
| `lab01-window.html` | The `window` object — global browser API |
| `lab02-document.html` | The DOM — reading and manipulating HTML elements |
| `lab03-cssom.html` | CSSOM — how CSS is parsed and applied |
| `lab04-animation.html` | Animations — requestAnimationFrame and CSS transitions |

---

### 2. JavaScript Fundamentals — `01-js-lab/`

Core JavaScript concepts, from functions to async patterns, building up to React-like simulations.

| File | Topic |
|------|-------|
| `00-functions.js` | Functions — declarations, expressions, closures |
| `01-app.js` / `01-math-module.js` / `01-string-module.js` | Modules — import/export |
| `02-fs-module.js` | File system — reading/writing files |
| `03-http-server.js` | HTTP server — basic Node.js server |
| `04-npm-packages.js` | NPM — using third-party packages |
| `05-async-await.js` | Async/Await — promises and asynchronous code |
| `06-events.js` | Events — EventEmitter pattern |
| `07-streams.js` | Streams — reading/writing data in chunks |
| `08-express.js` | Express — web framework basics |
| `09-arrays-1.js` / `09-arrays-2.js` | Arrays — map, filter, reduce, etc. |
| `10-objects-1.js` / `10-objects-2.js` | Objects — properties, methods, destructuring |
| `11-arrow-functions.js` | Arrow functions — syntax and `this` behavior |
| `13-global-functions.js` | Global functions — parseInt, setTimeout, etc. |
| `14-builtin-modules.js` | Built-in modules — path, os, url |
| `15-higher-order-functions.js` | Higher-order functions — functions that take/return functions |
| **Pre-React (DOM)** | |
| `16-pre-react-1-domcopy.html` | DOM manipulation — building UI without a framework |
| `16-pre-react-3-events.html` | Event handling in vanilla JS |
| `16-pre-react-4-timeouts.html` | Timeouts and intervals |
| `16-pre-react-5-eventloop.html` | Event loop — how JavaScript executes async code |
| **React Simulations (vanilla JS)** | |
| `17-react-sim-1-props.html` | Simulating React props |
| `17-react-sim-2-ref.html` | Simulating React refs |
| `17-react-sim-3-effect.html` | Simulating React effects |
| `17-react-sim-4-context.html` | Simulating React context |
| `17-react-sim-5-memo.html` | Simulating React memo |
| `17-react-sim-6-callback.html` | Simulating React useCallback |

---

### 3. React Internals (Plain JS) — `01-js-react/`

Build React's core concepts from scratch using plain JavaScript — no React library, just FiberNode simulations.

| File | Topic |
|------|-------|
| `00-functions.js` | JS fundamentals refresher |
| `00-spread-destructure.js` | Spread operator and destructuring |
| `00-tagged-template.js` | Tagged template literals |
| `01-fiberNode-props.js` | FiberNode — how React passes props |
| `02-fiberNode-useState.js` | FiberNode — implementing useState |
| `03-fiberNode-useEffect.js` | FiberNode — implementing useEffect |
| `04-fiberNode-useMemo.js` | FiberNode — implementing useMemo |
| `05-fiberNode-only-useContext.js` | FiberNode — useContext (simplified) |
| `05-fiberNode-useContext.js` | FiberNode — useContext (full) |
| `06-fiberNode-useRef.js` | FiberNode — implementing useRef |
| `07-fiberNode-useCallback.js` | FiberNode — implementing useCallback |
| `08-fiberNode-useReducer.js` | FiberNode — implementing useReducer |
| `09-fiberNode-lifecycle.js` | FiberNode — component lifecycle |
| `10-fiberNode-full-lifecycle.js` | FiberNode — full lifecycle simulation |

---

### 4. React First Steps — `02-react-sandbox/`

A minimal React app to experiment with components and hooks in a real React environment.

- `App.js` — Entry point
- `Hooks.js` — Hook experiments

---

### 5. React with Analogies — `03-react-analogy/` & `03-react-analogy-2/`

Understand React components through real-world analogies (Refrigerator, Television).

- `Refrigerator.js` — Component modeled as a refrigerator (state = temperature, props = items)
- `Television.js` — Component modeled as a television (state = channel, props = settings)

---

### 6. React Core Concepts — `03-react-core/`

A tabbed React app covering all foundational React concepts with working examples.

| Tab | File | Topic |
|-----|------|-------|
| 0 | `Tab0_Sandbox.js` | Free sandbox for experimenting |
| 1 | `Tab1_Components.js` | Components — building blocks of React |
| 2 | `Tab2_Props.js` | Props — passing data to components |
| 3 | `Tab3_State.js` | State — making components interactive |
| 4 | `Tab4_Events.js` | Events — handling clicks, typing, hover |
| 5 | `Tab5_Conditional.js` | Conditional rendering — if/else in JSX |
| 6 | `Tab6_UseEffect.js` | useEffect — side effects and cleanup |
| 7 | `Tab7_UseRef.js` | useRef — accessing DOM elements directly |
| 8 | `Tab8_UseContext.js` | useContext — sharing state across components |
| 8b | `Tab8_Only_UseContext.js` | useContext — simplified standalone example |
| 9 | `Tab9_UserForm.js` | User form — putting it all together |

---

### 7. React Hooks Deep Dive — `04-react-hooks/`

Dedicated exercises for each React hook with focused, minimal examples.

| Tab | Folder / File | Topic |
|-----|---------------|-------|
| 0 | `hooks/Tab0_UIElements.js` | UI element basics |
| 1 | `hooks/useContext/Tab1_UseContext.js` | useContext — hardcoded context value |
| 2 | `hooks/useContext/Tab2_ChangeContext.js` | useContext — dynamic context updates |
| 3 | `hooks/useMemo/Tab3_UseMemo.js` | useMemo — caching expensive calculations |
| 4 | `hooks/useCallback/Tab4_UseCallback.js` | useCallback — caching function references |
| 5 | `hooks/useRef/Tab5_UseRef.js` | useRef — persistent mutable values |
| 6 | `hooks/useReducer/Tab6_UseReducer.js` | useReducer — complex state logic |
| 7 | `hooks/useEffect/Tab7_UseEffect.js` | useEffect — side effects and cleanup |

---

## Getting Started

Each React app (`02-react-sandbox`, `03-react-analogy`, `03-react-analogy-2`, `03-react-core`, `04-react-hooks`) is a standalone Create React App project:

```bash
cd <folder>
npm install
npm start
```

For plain JS files (`00-html-lab`, `01-js-lab`, `01-js-react`):
- `.html` files — open directly in a browser
- `.js` files — run with `node <filename>`
