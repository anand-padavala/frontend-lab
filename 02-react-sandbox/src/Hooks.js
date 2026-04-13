import {useMemo, useRef, useContext, useState, useEffect} from "react"

function Hooks() {

  const [count, setCount] = useState(221)
  const ref = useRef(0)
 
  useEffect(() => {
     const fiberKey = Object.keys(ref.current).find(key =>
       key.startsWith("__reactFiber$")
     );

     const h1Fiber = ref.current[fiberKey];
     const appFiber = h1Fiber.return;

     console.log("h1 Fiber:", h1Fiber);
     console.log("App Fiber:", appFiber);
     console.log("Hooks (memoizedState):", appFiber.memoizedState);
   }, []);

  return (
      <h1 ref={ref}>Fiber Playground</h1>

  );
}

export default Hooks;
