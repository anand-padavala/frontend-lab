// Tab 10: Simple Form — simulating real-world server submission
// Hooks used: useState

import { useState } from "react";

// --- Simulate a server API call ---
// In real code this would be: fetch("/api/users", { method: "POST", body: JSON.stringify(data) })
function fakeApiCall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server-side validation: reject "admin" as a taken name
      if (data.name.toLowerCase() === "admin") {
        reject({ message: "Username 'admin' is already taken" });
      } else {
        resolve({ id: Date.now(), ...data, createdAt: new Date().toISOString() });
      }
    }, 1500); // 1.5s delay to mimic network latency
  });
}

function Tab10_SimpleForm() {
  const initialForm = { name: "", age: "" };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);     // loading state while server responds
  const [serverResponse, setServerResponse] = useState(null); // { success: true/false, data/message }

  // --- Client-side validation ---
  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(form.age) || !Number.isInteger(Number(form.age))) {
      newErrors.age = "Age must be a whole number";
    } else if (Number(form.age) < 1 || Number(form.age) > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    return newErrors;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setServerResponse(null); // Clear server message when user edits
  }

  // --- Submit: validate → call server → handle response ---
  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Client-side validation
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setServerResponse(null);
      return;
    }

    // 2. Send to server
    setSubmitting(true);
    setErrors({});
    setServerResponse(null);

    try {
      const result = await fakeApiCall({ name: form.name.trim(), age: Number(form.age) });
      // 3a. Server returned success
      setServerResponse({ success: true, data: result });
      setForm(initialForm); // Reset form on success
    } catch (err) {
      // 3b. Server returned an error
      setServerResponse({ success: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = {
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const errorStyle = { color: "red", fontSize: "12px", marginTop: "4px" };

  return (
    <div>
      <h2>Simple Form (useState only)</h2>
      <p>Simulates a real-world form: client validation → server call → handle success or error.</p>
      <p style={{ fontSize: "13px", color: "#666" }}>
        Try submitting the name "admin" to see a server-side error.
      </p>

      {/* Server response — success */}
      {serverResponse?.success && (
        <div style={{
          padding: "12px",
          backgroundColor: "#e8f5e9",
          border: "1px solid #a5d6a7",
          borderRadius: "6px",
          marginBottom: "16px",
        }}>
          <strong>Server response: User created!</strong>
          <pre style={{ margin: "6px 0 0", fontSize: "13px" }}>
            {JSON.stringify(serverResponse.data, null, 2)}
          </pre>
        </div>
      )}

      {/* Server response — error */}
      {serverResponse && !serverResponse.success && (
        <div style={{
          padding: "12px",
          backgroundColor: "#ffebee",
          border: "1px solid #ef9a9a",
          borderRadius: "6px",
          marginBottom: "16px",
        }}>
          <strong>Server error:</strong> {serverResponse.message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={submitting}
            style={{ ...inputStyle, borderColor: errors.name ? "red" : "#ccc" }}
            placeholder="Enter your name"
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Age *</label>
          <input
            type="text"
            name="age"
            value={form.age}
            onChange={handleChange}
            disabled={submitting}
            style={{ ...inputStyle, borderColor: errors.age ? "red" : "#ccc" }}
            placeholder="Enter your age"
          />
          {errors.age && <div style={errorStyle}>{errors.age}</div>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "10px 24px",
            backgroundColor: submitting ? "#aaa" : "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: submitting ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Concepts explained */}
      <h3 style={{ marginTop: "24px" }}>Key Concepts</h3>
      <pre style={{ backgroundColor: "#f5f5f5", padding: "12px", borderRadius: "6px", fontSize: "13px" }}>
{`1. Real-World Flow
   — Client validation first (instant feedback, no wasted server calls)
   — Then async server call (fetch / axios in real apps)
   — Then handle success OR error from the server

2. Loading State (submitting)
   — Disable inputs and button while waiting for the server
   — Show "Submitting..." text so the user knows it's working
   — Prevents double-submit (clicking the button twice)

3. Server Response Handling (try/catch/finally)
   — try:     await the API call, handle success
   — catch:   handle server errors (validation, network, etc.)
   — finally: always set submitting = false, even if it failed

4. Server-Side Errors
   — The server can reject data that passed client validation
   — Example: "admin" passes our checks but the server says it's taken
   — Always handle BOTH client and server errors`}
      </pre>
    </div>
  );
}

export default Tab10_SimpleForm;
