import { useState } from "react";
import CardPreview from "./CardPreview";
import "./CreditCard.css";

const initialForm = {
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};

// --- Validation helpers ---

function validateCardNumber(num) {
  const digits = num.replace(/\s/g, "");
  if (!digits) return "Card number is required";
  if (!/^\d+$/.test(digits)) return "Card number must be digits only";
  if (digits.length < 13 || digits.length > 19) return "Card number must be 13–19 digits";
  if (!luhnCheck(digits)) return "Invalid card number (fails Luhn check)";
  return "";
}

function luhnCheck(num) {
  let sum = 0;
  let alternate = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

function validateName(name) {
  if (!name.trim()) return "Cardholder name is required";
  if (name.trim().length < 2) return "Name is too short";
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name must contain only letters";
  return "";
}

function validateExpiry(expiry) {
  if (!expiry) return "Expiry date is required";
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return "Use MM/YY format";
  const [mm, yy] = expiry.split("/").map(Number);
  if (mm < 1 || mm > 12) return "Invalid month";
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  if (yy < currentYear || (yy === currentYear && mm < currentMonth)) return "Card is expired";
  return "";
}

function validateCVV(cvv) {
  if (!cvv) return "CVV is required";
  if (!/^\d{3,4}$/.test(cvv)) return "CVV must be 3 or 4 digits";
  return "";
}

// --- Formatting helpers ---

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

function detectCardType(number) {
  const digits = number.replace(/\s/g, "");
  if (/^4/.test(digits)) return "visa";
  if (/^5[1-5]/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^6011/.test(digits)) return "discover";
  return "unknown";
}

// --- Component ---

function CreditCardForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedCard, setSavedCard] = useState(null);

  const cardType = detectCardType(form.cardNumber);

  function handleChange(e) {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiry") formatted = formatExpiry(value);
    if (name === "cvv") formatted = value.replace(/\D/g, "").slice(0, 4);
    if (name === "cardName") formatted = value.replace(/[^a-zA-Z\s]/g, "");

    setForm((prev) => ({ ...prev, [name]: formatted }));

    // Clear error as user types
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, formatted) }));
    }
  }

  function validateField(name, value) {
    switch (name) {
      case "cardNumber": return validateCardNumber(value);
      case "cardName": return validateName(value);
      case "expiry": return validateExpiry(value);
      case "cvv": return validateCVV(value);
      default: return "";
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function validateAll() {
    const newErrors = {
      cardNumber: validateCardNumber(form.cardNumber),
      cardName: validateName(form.cardName),
      expiry: validateExpiry(form.expiry),
      cvv: validateCVV(form.cvv),
    };
    setErrors(newErrors);
    setTouched({ cardNumber: true, cardName: true, expiry: true, cvv: true });
    return Object.values(newErrors).every((e) => e === "");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;

    const digits = form.cardNumber.replace(/\s/g, "");
    setSavedCard({
      last4: digits.slice(-4),
      cardName: form.cardName,
      expiry: form.expiry,
      cardType,
    });
    setSubmitted(true);
  }

  function handleReset() {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSavedCard(null);
  }

  if (submitted && savedCard) {
    return (
      <div className="cc-success">
        <h3>Card Saved Successfully</h3>
        <p><strong>Type:</strong> {savedCard.cardType.toUpperCase()}</p>
        <p><strong>Card:</strong> **** **** **** {savedCard.last4}</p>
        <p><strong>Name:</strong> {savedCard.cardName}</p>
        <p><strong>Expires:</strong> {savedCard.expiry}</p>
        <button onClick={handleReset} className="cc-btn">Add Another Card</button>
      </div>
    );
  }

  return (
    <div className="cc-wrapper">
      <CardPreview form={form} cardType={cardType} />

      <form onSubmit={handleSubmit} noValidate className="cc-form">
        <div className="cc-field">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1234 5678 9012 3456"
            maxLength={23}
            className={touched.cardNumber && errors.cardNumber ? "cc-input error" : "cc-input"}
          />
          {touched.cardNumber && errors.cardNumber && (
            <span className="cc-error">{errors.cardNumber}</span>
          )}
        </div>

        <div className="cc-field">
          <label htmlFor="cardName">Cardholder Name</label>
          <input
            id="cardName"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="JOHN DOE"
            className={touched.cardName && errors.cardName ? "cc-input error" : "cc-input"}
          />
          {touched.cardName && errors.cardName && (
            <span className="cc-error">{errors.cardName}</span>
          )}
        </div>

        <div className="cc-row">
          <div className="cc-field">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              id="expiry"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="MM/YY"
              maxLength={5}
              className={touched.expiry && errors.expiry ? "cc-input error" : "cc-input"}
            />
            {touched.expiry && errors.expiry && (
              <span className="cc-error">{errors.expiry}</span>
            )}
          </div>

          <div className="cc-field">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="123"
              maxLength={4}
              type="password"
              className={touched.cvv && errors.cvv ? "cc-input error" : "cc-input"}
            />
            {touched.cvv && errors.cvv && (
              <span className="cc-error">{errors.cvv}</span>
            )}
          </div>
        </div>

        <button type="submit" className="cc-btn">Save Card</button>
      </form>
    </div>
  );
}

export default CreditCardForm;
