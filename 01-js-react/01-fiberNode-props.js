// ============================================================
// What to notice:
//
// 1. A component is just a function. FiberNode wraps it.
// 2. Props flow IN — the component reads them, never modifies them.
// 3. Changing props and calling render() again = re-render.
// ============================================================

class FiberNode {
  constructor(componentFn, props = {}) {
    this.componentFn = componentFn;
    this.props = props;
  }

  render() {
    const result = this.componentFn(this.props);
    console.log(result); 
    return result;
  }
}

// ============================================================
// A "component" — just a function that receives props
// ============================================================
function Greeting(props) {
  return `Hello ${props.name}, you are ${props.age} years old!`;
}

function UserCard(props) {
  return `[ ${props.name} ${props.role}] — ${props.email}`;
}
<Greeting> </Greeting>
// ============================================================
// Run it
// ============================================================
const fiber1 = new FiberNode(Greeting, { name: "Anand", age: 25 });
fiber1.render();


const fiber2 = new FiberNode(UserCard, { name: "Anand", role: "Admin", email: "anand@test.com" });
fiber2.render();

// Re-render with new props
fiber1.props = { name: "Anand", age: 26 };
fiber1.render();

