// Tab 9: User Form — using multiple hooks together
// Hooks used: useState, useReducer, useEffect, useRef, useMemo, useCallback

import { useState, useReducer, useEffect, useRef, useMemo, useCallback } from "react";

// --- useReducer: manages the form fields as one state object ---
const initialForm = {
  name: "",
  email: "",
  age: "",
  city: "",
  bio: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialForm;
    case "LOAD":
      return action.data;
    default:
      return state;
  }
}

function Tab9_UserForm() {
  // 1. useReducer — all form fields in one place
  const [form, dispatch] = useReducer(formReducer, initialForm);

  // 2. useState — saved profiles list and status message
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  // 3. useRef — focus the name input on load, track submit count
  const nameInputRef = useRef(null);
  const submitCount = useRef(0);

  // 4. useEffect — focus name input on mount
  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  // 5. useEffect — clear status message after 3 seconds
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  // 6. useEffect — load saved profiles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("userProfiles");
    if (saved) {
      setProfiles(JSON.parse(saved));
    }
  }, []);

  // 7. useEffect — save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userProfiles", JSON.stringify(profiles));
  }, [profiles]);

  // 8. useMemo — filter profiles by search (only recompute when profiles or search change)
  const filteredProfiles = useMemo(() => {
    if (!search) return profiles;
    const lower = search.toLowerCase();
    return profiles.filter(
      p => p.name.toLowerCase().includes(lower) || p.city.toLowerCase().includes(lower)
    );
  }, [profiles, search]);

  // 9. useCallback — stable handler for field changes (avoids recreating on every render)
  const handleChange = useCallback((e) => {
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });
  }, []);

  // 10. Form validation with useMemo (recomputes only when form changes)
  const errors = useMemo(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!form.email.includes("@")) errs.email = "Invalid email";
    if (form.age && (isNaN(form.age) || form.age < 1 || form.age > 120)) errs.age = "Age must be 1–120";
    return errs;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    const newProfile = { ...form, id: Date.now() };
    setProfiles(prev => [...prev, newProfile]);
    submitCount.current += 1;
    setStatus(`Profile saved! (Total submissions: ${submitCount.current})`);
    dispatch({ type: "RESET" });
    nameInputRef.current.focus();
  }

  // Load a profile back into the form for editing
  function loadProfile(profile) {
    dispatch({ type: "LOAD", data: profile });
    setStatus(`Loaded ${profile.name}'s profile`);
  }

  // Delete a profile
  function deleteProfile(id) {
    setProfiles(prev => prev.filter(p => p.id !== id));
    setStatus("Profile deleted");
  }

  const inputStyle = { padding: "6px", width: "100%", boxSizing: "border-box" };
  const errorStyle = { color: "red", fontSize: "12px", marginTop: "2px" };

  return (
    <div>
      <h2>User Profile Form</h2>
      <p>A form using multiple hooks together: useReducer, useState, useEffect, useRef, useMemo, useCallback.</p>

      {/* Status message */}
      {status && (
        <div style={{ padding: "8px", backgroundColor: "#e8f5e9", borderRadius: "6px", marginBottom: "10px" }}>
          {status}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <h3>Add / Edit Profile</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div>
            <label>Name *</label>
            <input ref={nameInputRef} name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" />
            {errors.name && <div style={errorStyle}>{errors.name}</div>}
          </div>
          <div>
            <label>Email *</label>
            <input name="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>
          <div>
            <label>Age</label>
            <input name="age" value={form.age} onChange={handleChange} style={inputStyle} placeholder="25" />
            {errors.age && <div style={errorStyle}>{errors.age}</div>}
          </div>
          <div>
            <label>City</label>
            <input name="city" value={form.city} onChange={handleChange} style={inputStyle} placeholder="Chennai" />
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} style={{ ...inputStyle, height: "60px" }} placeholder="Tell us about yourself..." />
        </div>
        <button type="submit" disabled={!isValid} style={{ padding: "8px 20px", marginRight: "5px" }}>
          Save Profile
        </button>
        <button type="button" onClick={() => dispatch({ type: "RESET" })} style={{ padding: "8px 20px" }}>
          Reset Form
        </button>
      </form>

      {/* Saved Profiles */}
      <h3>Saved Profiles ({profiles.length})</h3>

      {profiles.length > 0 && (
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or city..."
          style={{ ...inputStyle, width: "300px", marginBottom: "10px" }}
        />
      )}

      {filteredProfiles.length === 0 && <p>No profiles yet. Fill the form and save!</p>}

      {filteredProfiles.map(profile => (
        <div key={profile.id} style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "10px", marginBottom: "8px" }}>
          <strong>{profile.name}</strong> — {profile.email}
          {profile.age && <span> — Age: {profile.age}</span>}
          {profile.city && <span> — {profile.city}</span>}
          {profile.bio && <p style={{ margin: "4px 0", color: "#666" }}>{profile.bio}</p>}
          <div style={{ marginTop: "5px" }}>
            <button onClick={() => loadProfile(profile)} style={{ marginRight: "5px" }}>Edit</button>
            <button onClick={() => deleteProfile(profile.id)}>Delete</button>
          </div>
        </div>
      ))}

      {/* Hooks summary */}
      <h3>Hooks Used in This Form</h3>
      <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "6px" }}>
{`useReducer  → manages all form fields as one state object
useState    → profiles list, status message, search query
useRef      → focus name input, track submit count silently
useEffect   → focus on mount, auto-clear status, localStorage sync
useMemo     → filter profiles by search, validate form fields
useCallback → stable onChange handler (doesn't recreate every render)`}
      </pre>
    </div>
  );
}

export default Tab9_UserForm;
