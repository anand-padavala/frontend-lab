// Tab 1: Components & JSX basics

function Greeting() {
  return <h2>Welcome to React !</h2>;
}

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function Footer() {
  return <p>Copyright {new Date().getFullYear()}</p>;
}

function Tab1_Components() {
  const name = "Anand";
  const skills = ["JavaScript", "Node.js", "React"];

  return (
    <div>
      <h2>Components & JSX</h2>
      <p>A component is a function that returns JSX.</p>

      <h3>JavaScript in JSX</h3>
      <p>Hello, {name}!</p>
      <p>2 + 3 = {2 + 3}</p>
      <p>Uppercase: {formatName("anand")}</p>
      <p>Skills: {skills.join(", ")}</p>

      <h3>Reusable Components</h3>
      <Greeting />
      <Greeting />
      <Greeting />
      <Footer />
    </div>
  );
}

export default Tab1_Components;
