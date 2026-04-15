function CardPreview({ form, cardType }) {
  const displayNumber = form.cardNumber || "•••• •••• •••• ••••";
  const displayName = form.cardName || "YOUR NAME";
  const displayExpiry = form.expiry || "MM/YY";

  const typeLabels = {
    visa: "VISA",
    mastercard: "MASTERCARD",
    amex: "AMEX",
    discover: "DISCOVER",
    unknown: "",
  };

  return (
    <div className="cc-preview">
      <div className="cc-card">
        <div className="cc-card-type">{typeLabels[cardType]}</div>
        <div className="cc-card-number">{displayNumber}</div>
        <div className="cc-card-bottom">
          <div>
            <div className="cc-card-label">CARD HOLDER</div>
            <div className="cc-card-value">{displayName.toUpperCase()}</div>
          </div>
          <div>
            <div className="cc-card-label">EXPIRES</div>
            <div className="cc-card-value">{displayExpiry}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPreview;
