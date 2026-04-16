import { useState } from "react";
import "./UserProfile.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  city: "",
  state: "",
  zip: "",
};

// --- Validation helpers ---

function validateFirstName(name) {
  if (!name.trim()) return "First name is required";
  if (name.trim().length < 2) return "Too short";
  if (!/^[a-zA-Z]+$/.test(name.trim())) return "Letters only";
  return "";
}

function validateLastName(name) {
  if (!name.trim()) return "Last name is required";
  if (name.trim().length < 2) return "Too short";
  if (!/^[a-zA-Z]+$/.test(name.trim())) return "Letters only";
  return "";
}

function validateEmail(email) {
  if (!email.trim()) return "Email is required";
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim()))
    return "Invalid email format";
  return "";
}

function validatePhone(phone) {
  if (!phone.trim()) return "Phone is required";
  const digits = phone.replace(/[^0-9]/g, "");
  if (!/^1?[0-9]{10}$/.test(digits))
    return "Enter a valid 10-digit US phone number";
  return "";
}

function validateDOB(dob) {
  if (!dob) return "Date of birth is required";
  if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}$/.test(dob))
    return "Use MM/DD/YYYY format";
  const [mm, dd, yyyy] = dob.split("/").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  if (date.getMonth() !== mm - 1 || date.getDate() !== dd)
    return "Invalid date";
  if (date > new Date())
    return "Date cannot be in the future";
  if (yyyy < 1900)
    return "Year must be after 1900";
  return "";
}

function validateCity(city) {
  if (!city.trim()) return "City is required";
  if (city.trim().length < 2) return "Too short";
  if (!/^[a-zA-Z\s]+$/.test(city.trim())) return "Letters only";
  return "";
}

function validateState(state) {
  if (!state.trim()) return "State is required";
  if (!/^[A-Z]{2}$/.test(state.trim()))
    return "Use 2-letter abbreviation (e.g. CA, NY)";
  return "";
}

function validateZip(zip) {
  if (!zip.trim()) return "ZIP code is required";
  if (!/^[0-9]{5}(-[0-9]{4})?$/.test(zip.trim()))
    return "Enter a valid ZIP (e.g. 90210 or 90210-1234)";
  return "";
}

// --- Formatting helpers ---

function formatPhone(value) {
  const digits = value.replace(/[^0-9]/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatDOB(value) {
  const digits = value.replace(/[^0-9]/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
}

function formatZip(value) {
  const cleaned = value.replace(/[^0-9-]/g, "");
  const digits = cleaned.replace(/-/g, "");
  if (digits.length <= 5) return digits;
  return digits.slice(0, 5) + "-" + digits.slice(5, 9);
}

// --- Component ---

function UserProfileForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [savedProfile, setSavedProfile] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "firstName" || name === "lastName" || name === "city")
      formatted = value.replace(/[^a-zA-Z\s]/g, "");
    if (name === "phone") formatted = formatPhone(value);
    if (name === "dob") formatted = formatDOB(value);
    if (name === "state") formatted = value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
    if (name === "zip") formatted = formatZip(value);

    setForm((prev) => ({ ...prev, [name]: formatted }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, formatted) }));
    }
  }

  function validateField(name, value) {
    switch (name) {
      case "firstName": return validateFirstName(value);
      case "lastName": return validateLastName(value);
      case "email": return validateEmail(value);
      case "phone": return validatePhone(value);
      case "dob": return validateDOB(value);
      case "city": return validateCity(value);
      case "state": return validateState(value);
      case "zip": return validateZip(value);
      default: return "";
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function validateAll() {
    const newErrors = {};
    for (const key of Object.keys(initialForm)) {
      newErrors[key] = validateField(key, form[key]);
    }
    setErrors(newErrors);
    const allTouched = {};
    for (const key of Object.keys(initialForm)) allTouched[key] = true;
    setTouched(allTouched);
    return Object.values(newErrors).every((e) => e === "");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;

    setSavedProfile({ ...form });
  }

  function handleReset() {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setSavedProfile(null);
  }

  if (savedProfile) {
    return (
      <div className="up-success">
        <h3>Profile Saved Successfully</h3>
        <p><strong>Name:</strong> {savedProfile.firstName} {savedProfile.lastName}</p>
        <p><strong>Email:</strong> {savedProfile.email}</p>
        <p><strong>Phone:</strong> {savedProfile.phone}</p>
        <p><strong>DOB:</strong> {savedProfile.dob}</p>
        <p><strong>Location:</strong> {savedProfile.city}, {savedProfile.state} {savedProfile.zip}</p>
        <button onClick={handleReset} className="up-btn">Edit Profile</button>
      </div>
    );
  }

  const fields = [
    { name: "firstName", label: "First Name", placeholder: "John", type: "text" },
    { name: "lastName", label: "Last Name", placeholder: "Smith", type: "text" },
    { name: "email", label: "Email", placeholder: "john@example.com", type: "email" },
    { name: "phone", label: "Phone", placeholder: "(555) 123-4567", type: "tel", maxLength: 14 },
    { name: "dob", label: "Date of Birth", placeholder: "MM/DD/YYYY", type: "text", maxLength: 10 },
    { name: "city", label: "City", placeholder: "Los Angeles", type: "text" },
    { name: "state", label: "State", placeholder: "CA", type: "text", maxLength: 2 },
    { name: "zip", label: "ZIP Code", placeholder: "90210", type: "text", maxLength: 10 },
  ];

  return (
    <div className="up-wrapper">
      <form onSubmit={handleSubmit} noValidate className="up-form">
        {fields.map((field) => (
          <div className="up-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={form[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              className={touched[field.name] && errors[field.name] ? "up-input error" : "up-input"}
            />
            {touched[field.name] && errors[field.name] && (
              <span className="up-error">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <button type="submit" className="up-btn">Save Profile</button>
      </form>
    </div>
  );
}

export default UserProfileForm;
