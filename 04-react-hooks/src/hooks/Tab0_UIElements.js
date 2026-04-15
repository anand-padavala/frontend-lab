import { useState, useRef, useEffect } from "react";

const sectionStyle = {
  marginBottom: "25px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#555",
  fontSize: "12px",
  textTransform: "uppercase",
  marginBottom: "4px",
  display: "block",
};

function Tab0_UIElements() {
  // Caret
  const [caretPos, setCaretPos] = useState(0);
  const caretRef = useRef(null);

  // Tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Placeholder
  const [placeholderValue, setPlaceholderValue] = useState("");

  // Toggle / Switch
  const [toggleOn, setToggleOn] = useState(false);

  // Accordion
  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionItems = [
    { title: "Section A", content: "This is the content inside Section A. Accordions let users expand only what they need." },
    { title: "Section B", content: "Section B content. Only one section is open at a time in this example." },
    { title: "Section C", content: "Section C content. Click the same header again to collapse it." },
  ];

  // Breadcrumb
  const [breadcrumbPath, setBreadcrumbPath] = useState(["Home", "Products", "Electronics", "Phones"]);

  // Carousel
  const slides = ["Slide 1: Welcome", "Slide 2: Features", "Slide 3: Pricing", "Slide 4: Contact"];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  // Toast
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  function showToast(message) {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  // Skeleton
  const [skeletonLoaded, setSkeletonLoaded] = useState(true);

  // Chip / Tag
  const [chips, setChips] = useState(["React", "JavaScript", "CSS", "HTML", "Node.js"]);

  // Badge
  const [notifCount, setNotifCount] = useState(3);

  // Hamburger Menu
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // Kebab Menu
  const [kebabOpen, setKebabOpen] = useState(false);

  // Meatball Menu
  const [meatballOpen, setMeatballOpen] = useState(false);

  // Slider (Thumb / Handle / Track)
  const [sliderValue, setSliderValue] = useState(50);

  // Dropdown / Select
  const [selectedOption, setSelectedOption] = useState("react");

  // Popover
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Stepper
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Account", "Profile", "Settings", "Review"];

  // Spin Button
  const [spinValue, setSpinValue] = useState(10);

  // Close menus on outside click
  useEffect(() => {
    function handleClick() {
      setKebabOpen(false);
      setMeatballOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div>
      <h2>UI Elements Playground</h2>
      <p>Interactive demos of common UI elements and their technical names.</p>

      {/* 1. Caret */}
      <div style={sectionStyle}>
        <h3>1. Caret</h3>
        <span style={labelStyle}>The blinking text cursor inside an input</span>
        <input
          ref={caretRef}
          value="Click here and move with arrow keys"
          readOnly
          onSelect={() => setCaretPos(caretRef.current?.selectionStart || 0)}
          onKeyUp={() => setCaretPos(caretRef.current?.selectionStart || 0)}
          onClick={() => setCaretPos(caretRef.current?.selectionStart || 0)}
          style={{ width: "100%", padding: "8px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <p style={{ margin: "5px 0 0", color: "#666" }}>Caret position: <strong>{caretPos}</strong></p>
      </div>

      {/* 2. Tooltip */}
      <div style={sectionStyle}>
        <h3>2. Tooltip</h3>
        <span style={labelStyle}>Small popup that appears on hover</span>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <span
            title="I'm a native browser tooltip (title attribute)"
            style={{ padding: "8px 16px", backgroundColor: "#e3f2fd", borderRadius: "4px", cursor: "help" }}
          >
            Hover me (native tooltip)
          </span>
          <span
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <span style={{ padding: "8px 16px", backgroundColor: "#fff3e0", borderRadius: "4px", cursor: "help" }}>
              Hover me (custom tooltip)
            </span>
            {tooltipVisible && (
              <span style={{
                position: "absolute", bottom: "110%", left: "50%", transform: "translateX(-50%)",
                backgroundColor: "#333", color: "#fff", padding: "6px 10px", borderRadius: "4px",
                fontSize: "12px", whiteSpace: "nowrap", zIndex: 10,
              }}>
                I'm a custom tooltip built with React state
              </span>
            )}
          </span>
        </div>
      </div>

      {/* 3. Placeholder */}
      <div style={sectionStyle}>
        <h3>3. Placeholder</h3>
        <span style={labelStyle}>Greyed-out hint text inside an empty input</span>
        <input
          placeholder="Type something here... this text is the placeholder"
          value={placeholderValue}
          onChange={(e) => setPlaceholderValue(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <p style={{ margin: "5px 0 0", color: "#666" }}>
          {placeholderValue ? "Placeholder is now hidden because the input has a value." : "Placeholder is visible because the input is empty."}
        </p>
      </div>

      {/* 4. Toggle / Switch */}
      <div style={sectionStyle}>
        <h3>4. Toggle / Switch</h3>
        <span style={labelStyle}>On/off control</span>
        <div
          onClick={() => setToggleOn(!toggleOn)}
          style={{
            width: "50px", height: "26px", borderRadius: "13px", cursor: "pointer",
            backgroundColor: toggleOn ? "#4CAF50" : "#ccc", position: "relative", transition: "background-color 0.2s",
          }}
        >
          <div style={{
            width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#fff",
            position: "absolute", top: "2px", left: toggleOn ? "26px" : "2px", transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }} />
        </div>
        <p style={{ margin: "5px 0 0", color: "#666" }}>State: <strong>{toggleOn ? "ON" : "OFF"}</strong></p>
      </div>

      {/* 5. Accordion */}
      <div style={sectionStyle}>
        <h3>5. Accordion</h3>
        <span style={labelStyle}>Collapsible sections that expand/collapse on click</span>
        {accordionItems.map((item, i) => (
          <div key={i} style={{ border: "1px solid #ddd", borderRadius: "4px", marginBottom: "4px" }}>
            <div
              onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              style={{
                padding: "10px 12px", cursor: "pointer", backgroundColor: openAccordion === i ? "#e8f5e9" : "#fafafa",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <strong>{item.title}</strong>
              <span>{openAccordion === i ? "▲" : "▼"}</span>
            </div>
            {openAccordion === i && (
              <div style={{ padding: "10px 12px", borderTop: "1px solid #ddd" }}>{item.content}</div>
            )}
          </div>
        ))}
      </div>

      {/* 6. Breadcrumb */}
      <div style={sectionStyle}>
        <h3>6. Breadcrumb</h3>
        <span style={labelStyle}>Navigation trail showing page hierarchy</span>
        <div style={{ display: "flex", gap: "5px", alignItems: "center", flexWrap: "wrap" }}>
          {breadcrumbPath.map((crumb, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {i > 0 && <span style={{ color: "#999" }}>/</span>}
              <span
                onClick={() => setBreadcrumbPath(breadcrumbPath.slice(0, i + 1))}
                style={{
                  color: i === breadcrumbPath.length - 1 ? "#333" : "#1976d2",
                  cursor: i === breadcrumbPath.length - 1 ? "default" : "pointer",
                  fontWeight: i === breadcrumbPath.length - 1 ? "bold" : "normal",
                  textDecoration: i === breadcrumbPath.length - 1 ? "none" : "underline",
                }}
              >
                {crumb}
              </span>
            </span>
          ))}
        </div>
        <button
          onClick={() => setBreadcrumbPath(["Home", "Products", "Electronics", "Phones"])}
          style={{ marginTop: "8px", padding: "4px 10px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          Reset Path
        </button>
      </div>

      {/* 7. Carousel / Slider */}
      <div style={sectionStyle}>
        <h3>7. Carousel / Slider</h3>
        <span style={labelStyle}>Rotating content panels</span>
        <div style={{
          backgroundColor: "#f5f5f5", padding: "30px", textAlign: "center", borderRadius: "6px",
          fontSize: "18px", fontWeight: "bold", minHeight: "60px", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {slides[currentSlide]}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            style={{ padding: "6px 14px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            Previous
          </button>
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: "10px", height: "10px", borderRadius: "50%", cursor: "pointer",
                backgroundColor: i === currentSlide ? "#4CAF50" : "#ccc", display: "inline-block", alignSelf: "center",
              }}
            />
          ))}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            style={{ padding: "6px 14px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            Next
          </button>
        </div>
      </div>

      {/* 8. Modal / Dialog */}
      <div style={sectionStyle}>
        <h3>8. Modal / Dialog</h3>
        <span style={labelStyle}>Overlay popup that blocks interaction with the page behind</span>
        <button
          onClick={() => setModalOpen(true)}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer", backgroundColor: "#e3f2fd" }}
        >
          Open Modal
        </button>
        {modalOpen && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
          }} onClick={() => setModalOpen(false)}>
            <div
              style={{
                backgroundColor: "#fff", padding: "25px", borderRadius: "8px", maxWidth: "400px", width: "90%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginTop: 0 }}>I'm a Modal</h3>
              <p>This overlay blocks interaction with the page behind it. Click outside or the button below to close.</p>
              <button
                onClick={() => setModalOpen(false)}
                style={{ padding: "8px 16px", borderRadius: "4px", border: "none", backgroundColor: "#4CAF50", color: "#fff", cursor: "pointer" }}
              >
                Close Modal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 9. Toast / Snackbar */}
      <div style={sectionStyle}>
        <h3>9. Toast / Snackbar</h3>
        <span style={labelStyle}>Brief notification that auto-dismisses</span>
        <button
          onClick={() => showToast("Action completed successfully!")}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer", backgroundColor: "#e8f5e9" }}
        >
          Show Toast
        </button>
        <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000, display: "flex", flexDirection: "column", gap: "8px" }}>
          {toasts.map((toast) => (
            <div key={toast.id} style={{
              backgroundColor: "#333", color: "#fff", padding: "12px 20px", borderRadius: "6px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)", fontSize: "14px",
            }}>
              {toast.message}
            </div>
          ))}
        </div>
      </div>

      {/* 10. Skeleton */}
      <div style={sectionStyle}>
        <h3>10. Skeleton</h3>
        <span style={labelStyle}>Grey placeholder shapes shown while content is loading</span>
        <button
          onClick={() => {
            setSkeletonLoaded(false);
            setTimeout(() => setSkeletonLoaded(true), 2000);
          }}
          style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer", marginBottom: "10px" }}
        >
          Simulate Loading
        </button>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {skeletonLoaded ? (
            <>
              <div style={{
                width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#4CAF50",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                fontWeight: "bold", fontSize: "20px", flexShrink: 0,
              }}>
                J
              </div>
              <div>
                <strong>John Doe</strong>
                <p style={{ margin: "2px 0", color: "#666" }}>Software Engineer at Acme Corp</p>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#e0e0e0" }} />
              <div>
                <div style={{ width: "120px", height: "16px", backgroundColor: "#e0e0e0", borderRadius: "4px", marginBottom: "6px" }} />
                <div style={{ width: "200px", height: "12px", backgroundColor: "#e0e0e0", borderRadius: "4px" }} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 11. Chip / Tag */}
      <div style={sectionStyle}>
        <h3>11. Chip / Tag</h3>
        <span style={labelStyle}>Small labeled elements — click X to remove</span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {chips.map((chip) => (
            <span key={chip} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 10px", backgroundColor: "#e3f2fd", borderRadius: "16px", fontSize: "13px",
            }}>
              {chip}
              <span
                onClick={() => setChips(chips.filter((c) => c !== chip))}
                style={{ cursor: "pointer", fontWeight: "bold", color: "#999" }}
              >
                x
              </span>
            </span>
          ))}
        </div>
        <button
          onClick={() => setChips(["React", "JavaScript", "CSS", "HTML", "Node.js"])}
          style={{ marginTop: "8px", padding: "4px 10px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
        >
          Reset Chips
        </button>
      </div>

      {/* 12. Badge */}
      <div style={sectionStyle}>
        <h3>12. Badge</h3>
        <span style={labelStyle}>Notification count indicator</span>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <span style={{ position: "relative", display: "inline-block", fontSize: "24px" }}>
            &#128276;
            {notifCount > 0 && (
              <span style={{
                position: "absolute", top: "-6px", right: "-10px",
                backgroundColor: "#f44336", color: "#fff", borderRadius: "50%",
                width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: "bold",
              }}>
                {notifCount}
              </span>
            )}
          </span>
          <button
            onClick={() => setNotifCount((n) => n + 1)}
            style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            Add Notification
          </button>
          <button
            onClick={() => setNotifCount(0)}
            style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* 13. Hamburger Menu */}
      <div style={sectionStyle}>
        <h3>13. Hamburger Menu</h3>
        <span style={labelStyle}>Three-line icon that toggles a nav menu</span>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            style={{ cursor: "pointer", fontSize: "28px", lineHeight: "1", userSelect: "none", padding: "4px 8px" }}
          >
            &#9776;
          </div>
          {hamburgerOpen && (
            <div style={{
              position: "absolute", top: "100%", left: 0, backgroundColor: "#fff",
              border: "1px solid #ddd", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              minWidth: "150px", zIndex: 10,
            }}>
              {["Home", "About", "Services", "Contact"].map((item) => (
                <div key={item} onClick={() => setHamburgerOpen(false)} style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #eee" }}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 14. Kebab Menu */}
      <div style={sectionStyle}>
        <h3>14. Kebab Menu</h3>
        <span style={labelStyle}>Three vertical dots for more options</span>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            onClick={(e) => { e.stopPropagation(); setKebabOpen(!kebabOpen); }}
            style={{
              cursor: "pointer", userSelect: "none", padding: "8px 12px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
            }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#333" }} />
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#333" }} />
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#333" }} />
          </div>
          {kebabOpen && (
            <div style={{
              position: "absolute", top: "100%", left: 0, backgroundColor: "#fff",
              border: "1px solid #ddd", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              minWidth: "120px", zIndex: 10,
            }}>
              {["Edit", "Delete", "Share"].map((item) => (
                <div key={item} onClick={() => setKebabOpen(false)} style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #eee" }}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 15. Meatball Menu */}
      <div style={sectionStyle}>
        <h3>15. Meatball Menu</h3>
        <span style={labelStyle}>Three horizontal dots</span>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            onClick={(e) => { e.stopPropagation(); setMeatballOpen(!meatballOpen); }}
            style={{
              cursor: "pointer", userSelect: "none", padding: "8px 12px",
              display: "flex", flexDirection: "row", alignItems: "center", gap: "3px",
            }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#333" }} />
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#333" }} />
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#333" }} />
          </div>
          {meatballOpen && (
            <div style={{
              position: "absolute", top: "100%", left: 0, backgroundColor: "#fff",
              border: "1px solid #ddd", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              minWidth: "120px", zIndex: 10,
            }}>
              {["Copy Link", "Report", "Mute"].map((item) => (
                <div key={item} onClick={() => setMeatballOpen(false)} style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #eee" }}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 16. Slider — Thumb / Handle / Track */}
      <div style={sectionStyle}>
        <h3>16. Slider (Thumb / Handle / Track)</h3>
        <span style={labelStyle}>Thumb = draggable part, Track = the bar it moves along</span>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <p style={{ margin: "5px 0 0", color: "#666" }}>Value: <strong>{sliderValue}</strong></p>
      </div>

      {/* 17. Dropdown / Select */}
      <div style={sectionStyle}>
        <h3>17. Dropdown / Select</h3>
        <span style={labelStyle}>Collapsible list of options</span>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" }}
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
        </select>
        <p style={{ margin: "5px 0 0", color: "#666" }}>Selected: <strong>{selectedOption}</strong></p>
      </div>

      {/* 18. Popover */}
      <div style={sectionStyle}>
        <h3>18. Popover</h3>
        <span style={labelStyle}>Floating panel triggered by click (richer than tooltip)</span>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onClick={() => setPopoverOpen(!popoverOpen)}
            style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            {popoverOpen ? "Close Popover" : "Open Popover"}
          </button>
          {popoverOpen && (
            <div style={{
              position: "absolute", top: "110%", left: 0, backgroundColor: "#fff",
              border: "1px solid #ddd", borderRadius: "8px", padding: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)", width: "250px", zIndex: 10,
            }}>
              <strong>User Info</strong>
              <p style={{ margin: "8px 0", fontSize: "13px" }}>Popovers can contain rich content like forms, images, or actions.</p>
              <button
                onClick={() => setPopoverOpen(false)}
                style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer", fontSize: "12px" }}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 19. Stepper */}
      <div style={sectionStyle}>
        <h3>19. Stepper</h3>
        <span style={labelStyle}>Multi-step progress indicator</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "15px" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: i <= currentStep ? "#4CAF50" : "#e0e0e0",
                color: i <= currentStep ? "#fff" : "#999", fontWeight: "bold", fontSize: "13px", flexShrink: 0,
              }}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span style={{ marginLeft: "6px", fontSize: "13px", color: i <= currentStep ? "#333" : "#999" }}>{step}</span>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: "2px", backgroundColor: i < currentStep ? "#4CAF50" : "#e0e0e0", margin: "0 8px" }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            style={{ padding: "6px 14px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={currentStep === steps.length - 1}
            style={{ padding: "6px 14px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            Next
          </button>
        </div>
      </div>

      {/* 20. Spin Button */}
      <div style={sectionStyle}>
        <h3>20. Spin Button</h3>
        <span style={labelStyle}>Number input with increment/decrement arrows</span>
        <input
          type="number"
          value={spinValue}
          onChange={(e) => setSpinValue(Number(e.target.value))}
          style={{ padding: "8px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", width: "100px" }}
        />
        <p style={{ margin: "5px 0 0", color: "#666" }}>The arrows are called <strong>spin buttons</strong>. Value: <strong>{spinValue}</strong></p>
      </div>
    </div>
  );
}

export default Tab0_UIElements;
