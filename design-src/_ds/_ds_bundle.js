/* @ds-bundle: {"format":3,"namespace":"LarsoonDesignSystem_0ae6dc","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"IconChip","sourcePath":"components/core/IconChip.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"WizardSteps","sourcePath":"components/core/WizardSteps.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a3a6ed4a66bf","components/core/Button.jsx":"0e558696feda","components/core/Card.jsx":"671a786d40f6","components/core/Eyebrow.jsx":"53f3da769c8b","components/core/IconChip.jsx":"aea66561b2b4","components/core/SectionHeader.jsx":"c368c895fe57","components/core/Stat.jsx":"453cd0a48692","components/core/WizardSteps.jsx":"2589f03c961e","components/forms/Checkbox.jsx":"d1c3a855bbb7","components/forms/Input.jsx":"a749ddef92ae","components/forms/Slider.jsx":"18f97b906456","ui_kits/landing/Calculator.jsx":"6684bdf8ce06","ui_kits/landing/Header.jsx":"d84424d2619e","ui_kits/landing/Hero.jsx":"cb5668ecab67","ui_kits/landing/PhotoPlaceholder.jsx":"c38460f38906","ui_kits/landing/Sections.jsx":"e43412f3bd91","ui_kits/wizard/QuoteCard.jsx":"d9484d20f392","ui_kits/wizard/WizardFlow.jsx":"8eb09574f47c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LarsoonDesignSystem_0ae6dc = window.LarsoonDesignSystem_0ae6dc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  cyan: {
    bg: "var(--cyan-tint)",
    fg: "var(--cyan-800)",
    dot: "var(--cyan-600)"
  },
  savings: {
    bg: "var(--savings-tint)",
    fg: "#0E7A53",
    dot: "var(--savings)"
  },
  solar: {
    bg: "var(--solar-tint)",
    fg: "#946100",
    dot: "var(--solar)"
  },
  neutral: {
    bg: "var(--n-100)",
    fg: "var(--n-600)",
    dot: "var(--n-400)"
  },
  "savings-on-dark": {
    bg: "rgba(21,160,110,.14)",
    fg: "#3ad99a",
    dot: "#3ad99a"
  },
  "cyan-on-dark": {
    bg: "rgba(0,206,241,.14)",
    fg: "var(--cyan)",
    dot: "var(--cyan)"
  }
};

/**
 * Badge — small pill for status / proof points. Optional leading dot.
 */
function Badge({
  children,
  tone = "cyan",
  dot = false,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.cyan;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      background: t.bg,
      color: t.fg,
      fontFamily: "var(--font-text)",
      fontSize: 12.5,
      fontWeight: 700,
      padding: "6px 12px",
      borderRadius: "var(--r-pill)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: t.dot,
      flex: "0 0 auto"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Larsoon Button — pill-shaped action with brand variants.
 * Primary uses electric cyan with dark text + cyan glow; dark is the
 * secondary-primary; ghost is a hairline-bordered tertiary.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconRight = null,
  iconLeft = null,
  disabled = false,
  type = "button",
  href,
  onClick,
  style = {},
  ...rest
}) {
  const pad = {
    sm: "10px 18px",
    md: "14px 26px",
    lg: "17px 32px"
  }[size];
  const fontSize = {
    sm: 14,
    md: 15,
    lg: 17
  }[size];
  const base = {
    fontFamily: "var(--font-text)",
    fontWeight: 700,
    fontSize,
    lineHeight: 1,
    padding: pad,
    borderRadius: "var(--r-pill)",
    border: "1.5px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform var(--dur) var(--ease), background var(--dur) var(--ease), box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease)",
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  const variants = {
    primary: {
      background: "var(--cyan)",
      color: "var(--on-cyan)",
      boxShadow: "var(--shadow-cyan)"
    },
    dark: {
      background: "var(--slate-900)",
      color: "#fff",
      boxShadow: "var(--shadow-sm)"
    },
    ghost: {
      background: "transparent",
      color: "var(--cyan-800)",
      borderColor: "var(--n-200)"
    },
    "ghost-on-dark": {
      background: "transparent",
      color: "#fff",
      borderColor: "var(--slate-700)"
    }
  };
  const styles = {
    ...base,
    ...(variants[variant] || variants.primary)
  };
  const onEnter = e => {
    if (disabled) return;
    if (variant === "primary") e.currentTarget.style.background = "var(--cyan-bright)";
    if (variant === "dark") e.currentTarget.style.background = "var(--slate-800)";
    if (variant === "ghost") e.currentTarget.style.borderColor = "var(--n-400)";
    if (variant === "ghost-on-dark") e.currentTarget.style.borderColor = "var(--cyan)";
    e.currentTarget.style.transform = "translateY(-2px)";
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.background = variants[variant]?.background || variants.primary.background;
    e.currentTarget.style.borderColor = variants[variant]?.borderColor || "transparent";
    e.currentTarget.style.transform = "translateY(0)";
  };
  const Tag = href ? "a" : "button";
  const tagProps = href ? {
    href
  } : {
    type,
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, tagProps, {
    onClick: onClick,
    style: styles,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — white surface, hairline border, soft shadow, hover lift.
 * `variant="dark"` is a midnight feature card with a 3px gradient top rule.
 */
function Card({
  children,
  variant = "light",
  hover = true,
  padding = 26,
  style = {},
  ...rest
}) {
  const dark = variant === "dark";
  const [lift, setLift] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => hover && setLift(true),
    onMouseLeave: () => hover && setLift(false),
    style: {
      position: "relative",
      background: dark ? "var(--midnight)" : "var(--white)",
      color: dark ? "#fff" : "var(--ink)",
      border: dark ? "1px solid transparent" : "1px solid var(--n-200)",
      borderRadius: "var(--r)",
      padding,
      boxShadow: lift ? "var(--shadow-xl)" : "var(--shadow-sm)",
      transform: lift ? "translateY(-4px)" : "translateY(0)",
      transition: "transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease)",
      overflow: "hidden",
      ...style
    }
  }, rest), dark && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: "0 0 auto 0",
      height: 3,
      background: "var(--grad)"
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — uppercase mono-tracked label that sits above section titles.
 * Cyan-600 on light, cyan on dark.
 */
function Eyebrow({
  children,
  onDark = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-text)",
      fontWeight: 700,
      fontSize: "var(--fs-eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: onDark ? "var(--cyan)" : "var(--cyan-600)",
      display: "inline-block",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconChip.jsx
try { (() => {
const TINTS = {
  cyan: {
    bg: "var(--cyan-tint)",
    fg: "var(--cyan-800)"
  },
  savings: {
    bg: "var(--savings-tint)",
    fg: "var(--savings)"
  },
  solar: {
    bg: "var(--solar-tint)",
    fg: "#B57A00"
  },
  indigo: {
    bg: "var(--indigo-tint)",
    fg: "var(--indigo)"
  }
};

/**
 * IconChip — a rounded tinted square that houses a line icon (~1.7 stroke).
 * Rotate `tint` across a row for variety. Pass a Lucide/line icon as children.
 */
function IconChip({
  children,
  tint = "cyan",
  size = 48,
  style = {}
}) {
  const t = TINTS[tint] || TINTS.cyan;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.28),
      background: t.bg,
      color: t.fg,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { IconChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconChip.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
/**
 * SectionHeader — the canonical eyebrow + Sora title + lead block.
 * `gradientWord` colors a single word of the title with the brand gradient.
 */
function SectionHeader({
  eyebrow,
  title,
  gradientWord,
  lead,
  onDark = false,
  align = "left",
  maxWidth = 680,
  style = {}
}) {
  const renderTitle = () => {
    if (!gradientWord || typeof title !== "string") return title;
    const parts = title.split(gradientWord);
    return /*#__PURE__*/React.createElement(React.Fragment, null, parts[0], /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--grad)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent"
      }
    }, gradientWord), parts.slice(1).join(gradientWord));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth,
      textAlign: align,
      marginInline: align === "center" ? "auto" : undefined,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    onDark: onDark
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "var(--fs-h2)",
      lineHeight: "var(--lh-tight)",
      letterSpacing: "var(--tracking-display)",
      color: onDark ? "#fff" : "var(--ink)",
      margin: "12px 0 0"
    }
  }, renderTitle()), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontWeight: 500,
      fontSize: "var(--fs-lead)",
      lineHeight: 1.5,
      color: onDark ? "var(--text-on-dark)" : "var(--text-muted)",
      margin: "16px 0 0",
      textWrap: "pretty"
    }
  }, lead));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
/**
 * Stat — data-emphasis block. Big Sora figure with tabular numerals, a unit in
 * muted tone at ~0.5em, and a caption below. Savings figures use the green tone.
 */
function Stat({
  value,
  unit,
  label,
  tone = "ink",
  size = 44,
  onDark = false,
  align = "left",
  style = {}
}) {
  const valueColor = tone === "savings" ? "var(--savings)" : tone === "cyan" ? "var(--cyan)" : onDark ? "#fff" : "var(--ink)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: "var(--tracking-display)",
      color: valueColor,
      fontVariantNumeric: "tabular-nums"
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.45em",
      color: "var(--n-400)",
      fontWeight: 700,
      marginLeft: 4
    }
  }, unit)), label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-text)",
      fontWeight: 600,
      fontSize: 13,
      color: onDark ? "var(--n-400)" : "var(--n-500)",
      marginTop: 6
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/WizardSteps.jsx
try { (() => {
/**
 * WizardSteps — horizontal progress for the quote generator.
 * Completed & active steps in cyan; upcoming in neutral.
 * `steps` is an array of labels; `current` is the 0-based active index.
 */
function WizardSteps({
  steps = [],
  current = 0,
  showLabels = true,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      rowGap: 10,
      ...style
    }
  }, steps.map((label, i) => {
    const done = i < current;
    const now = i === current;
    const dotStyle = done ? {
      background: "var(--cyan)",
      color: "var(--on-cyan)"
    } : now ? {
      background: "var(--slate-900)",
      color: "#fff",
      boxShadow: "0 0 0 4px rgba(0,206,241,.25)"
    } : {
      background: "var(--n-100)",
      color: "var(--n-400)"
    };
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 13,
        flex: "0 0 auto",
        ...dotStyle
      }
    }, done ? "✓" : i + 1), showLabels && now && label && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-text)",
        fontSize: 12.5,
        fontWeight: 600,
        color: "var(--ink)",
        whiteSpace: "nowrap"
      }
    }, label)), i < steps.length - 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 2,
        margin: "0 8px",
        background: done ? "var(--cyan)" : "var(--n-200)",
        flex: "0 0 auto"
      }
    }));
  }));
}
Object.assign(__ds_scope, { WizardSteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WizardSteps.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — square hairline box that fills cyan when checked. Label sits to the right.
 */
function Checkbox({
  checked = false,
  onChange,
  label,
  id,
  style = {},
  ...rest
}) {
  const boxId = id || (typeof label === "string" ? `cb-${label.slice(0, 12).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: 11,
      cursor: "pointer",
      fontFamily: "var(--font-text)",
      fontSize: 14,
      color: "var(--n-600)",
      lineHeight: 1.5,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: boxId,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      flex: "0 0 auto",
      marginTop: 1,
      borderRadius: 6,
      border: `1.5px solid ${checked ? "var(--cyan)" : "var(--n-300)"}`,
      background: checked ? "var(--cyan)" : "var(--white)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--dur) var(--ease), border-color var(--dur) var(--ease)"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--on-cyan)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field. Hairline border, focuses to cyan.
 * Supports an optional leading icon and helper/error text.
 */
function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  iconLeft = null,
  error,
  helper,
  required = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const borderColor = error ? "var(--error)" : focus ? "var(--cyan)" : "var(--n-200)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--n-600)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--cyan-600)"
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--white)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--r-sm)",
      padding: "0 14px",
      boxShadow: focus ? "0 0 0 4px rgba(0,206,241,.16)" : "none",
      transition: "border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)"
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--n-400)",
      display: "inline-flex"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 0,
      outline: 0,
      background: "transparent",
      fontFamily: "var(--font-text)",
      fontSize: 16,
      fontWeight: 500,
      color: "var(--ink)",
      padding: "13px 0",
      minWidth: 0
    }
  }, rest))), (error || helper) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 12.5,
      color: error ? "var(--error)" : "var(--n-500)"
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
/**
 * Slider — touch-friendly range control for the savings calculator.
 * Cyan progress fill, large draggable thumb, optional value/unit readout.
 */
function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  unit = "",
  formatValue,
  id,
  style = {}
}) {
  const pct = (value - min) / (max - min) * 100;
  const sliderId = id || (label ? `sl-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const display = formatValue ? formatValue(value) : value;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      ...style
    }
  }, (label || unit !== undefined) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: sliderId,
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 14,
      fontWeight: 600,
      color: "var(--n-600)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "var(--tracking-display)",
      color: "var(--cyan-800)",
      fontVariantNumeric: "tabular-nums"
    }
  }, display, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--n-400)",
      marginLeft: 4
    }
  }, unit))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 28,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 8,
      borderRadius: 999,
      background: "var(--n-100)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      width: `${pct}%`,
      height: 8,
      borderRadius: 999,
      background: "var(--grad)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    id: sliderId,
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      position: "relative",
      width: "100%",
      margin: 0,
      background: "transparent",
      WebkitAppearance: "none",
      appearance: "none",
      height: 28,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement("style", null, `
          #${sliderId}::-webkit-slider-thumb{
            -webkit-appearance:none; appearance:none;
            width:28px; height:28px; border-radius:50%;
            background:#fff; border:none;
            box-shadow:0 2px 8px -1px rgba(11,20,28,.28), 0 0 0 5px rgba(0,206,241,.9);
            cursor:pointer; margin-top:0;
          }
          #${sliderId}::-moz-range-thumb{
            width:28px; height:28px; border-radius:50%;
            background:#fff; border:none;
            box-shadow:0 2px 8px -1px rgba(11,20,28,.28), 0 0 0 5px rgba(0,206,241,.9);
            cursor:pointer;
          }
          #${sliderId}::-webkit-slider-runnable-track{ background:transparent; height:28px; }
          #${sliderId}::-moz-range-track{ background:transparent; height:8px; }
        `)));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Calculator.jsx
try { (() => {
const {
  Slider,
  Checkbox,
  Button,
  Stat,
  Badge
} = window.LarsoonDesignSystem_0ae6dc;

// Croatian number formatting (1.234,56)
const hr = (n, dec = 0) => n.toLocaleString("hr-HR", {
  minimumFractionDigits: dec,
  maximumFractionDigits: dec
});

/**
 * Calculator — the live savings moment. Slider (power) + battery toggle feed a
 * white result card that "pops" on dark. ILLUSTRATIVE ranges only — the real
 * numbers come from the wizard. Hands off to ponuda-se.larsoon.com.
 */
function Calculator({
  onGenerate
}) {
  const [power, setPower] = React.useState(6.5);
  const [battery, setBattery] = React.useState(true);
  const yield_ = Math.round(power * 1160); // kWh / year
  const invest = Math.round(power * 1320 + (battery ? 5200 : 0));
  const annualSaving = Math.round(yield_ * (battery ? 0.19 : 0.11));
  const payback = (invest * 0.5 / annualSaving).toFixed(1); // after ~50% subvencija
  const selfUse = battery ? 70 : 30;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--white)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-xl)",
      padding: 28,
      width: "100%",
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: "var(--cyan-600)"
    }
  }, "Kalkulator u\u0161tede"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 23,
      letterSpacing: "-.02em",
      margin: "6px 0 22px"
    }
  }, "Koliko vam se isplati?"), /*#__PURE__*/React.createElement(Slider, {
    label: "Snaga elektrane",
    unit: "kWp",
    min: 3,
    max: 12,
    step: 0.5,
    value: power,
    onChange: setPower,
    formatValue: v => hr(v, 1)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      paddingTop: 16,
      borderTop: "1px solid var(--n-100)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: battery,
    onChange: e => setBattery(e.target.checked),
    label: "S baterijom"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18,
      margin: "22px 0",
      padding: "20px 0",
      borderTop: "1px solid var(--n-100)",
      borderBottom: "1px solid var(--n-100)"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: hr(invest),
    unit: "\u20AC",
    label: "Procijenjena investicija",
    size: 30
  }), /*#__PURE__*/React.createElement(Stat, {
    value: hr(yield_),
    unit: "kWh",
    label: "Godi\u0161nja proizvodnja",
    size: 30
  }), /*#__PURE__*/React.createElement(Stat, {
    value: payback.replace(".", ","),
    unit: "god",
    label: "Procijenjeni povrat",
    size: 30,
    tone: "savings"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: selfUse,
    unit: "%",
    label: "Samopotro\u0161nja",
    size: 30,
    tone: "cyan"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 18,
        height: 18
      }
    }),
    onClick: onGenerate,
    style: {
      width: "100%"
    }
  }, "Izradi moju ponudu"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 12,
      color: "var(--n-400)",
      margin: "12px 0 0",
      lineHeight: 1.5
    }
  }, "Okvirne vrijednosti. To\u010Dan izra\u010Dun za va\u0161 krov dobivate u ponudi."));
}
Object.assign(window, {
  Calculator
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Calculator.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Header.jsx
try { (() => {
const {
  Button
} = window.LarsoonDesignSystem_0ae6dc;

/**
 * Header — sticky dark navigation. Light logo left, anchors + cyan pill CTA right.
 * Turns solid on scroll (here: always solid midnight for the kit).
 */
function Header({
  onCTA
}) {
  const links = ["Ušteda", "Baterija", "Kako funkcionira", "Subvencija", "Radovi", "Kontakt"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      background: "rgba(11,20,28,.86)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--slate-700)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "14px var(--gutter)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/larsoon-logo-light.png",
    alt: "Larsoon",
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 26,
      alignItems: "center"
    },
    className: "ls-navlinks"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 14,
      fontWeight: 500,
      color: "var(--n-300)",
      textDecoration: "none",
      whiteSpace: "nowrap"
    },
    onMouseEnter: e => e.currentTarget.style.color = "#fff",
    onMouseLeave: e => e.currentTarget.style.color = "var(--n-300)"
  }, l))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onCTA
  }, "Izra\u010Dunaj u\u0161tedu")));
}
Object.assign(window, {
  Header
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Hero.jsx
try { (() => {
const {
  Eyebrow,
  Button,
  Badge
} = window.LarsoonDesignSystem_0ae6dc;

/**
 * Hero — the signature midnight moment. Eyebrow, Sora H1 with one gradient word,
 * lead, primary + ghost CTAs, trust pills — and the live Calculator card alongside.
 */
function Hero({
  onCTA,
  aside
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--midnight)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: 820,
      height: 820,
      right: -220,
      top: -320,
      background: "radial-gradient(circle, rgba(0,206,241,.18), transparent 62%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 4,
      background: "var(--grad)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "clamp(48px,7vw,96px) var(--gutter)",
      display: "grid",
      gridTemplateColumns: "1.1fr .9fr",
      gap: "clamp(32px,5vw,64px)",
      alignItems: "center"
    },
    className: "ls-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    onDark: true
  }, "Solarna elektrana + baterija"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "var(--fs-hero)",
      lineHeight: "var(--lh-hero)",
      letterSpacing: "var(--tracking-display)",
      color: "#fff",
      margin: "18px 0 0",
      maxWidth: "16ch"
    }
  }, "Vidite svoju", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--grad)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "u\u0161tedu"), " ", "prije nego potpi\u0161ete."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontWeight: 500,
      fontSize: "var(--fs-lead)",
      lineHeight: 1.55,
      color: "var(--n-300)",
      margin: "24px 0 0",
      maxWidth: "52ch"
    }
  }, "Personalizirana procjena za va\u0161 krov \u2014 investicija, povrat i godi\u0161nja proizvodnja. Bez poziva, bez obveze, za 3 minute."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 30,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 18,
        height: 18
      }
    }),
    onClick: onCTA
  }, "Izra\u010Dunaj u\u0161tedu"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost-on-dark"
  }, "Kako funkcionira")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      marginTop: 28,
      alignItems: "center",
      color: "var(--n-400)",
      fontFamily: "var(--font-text)",
      fontSize: 13.5,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: 16,
      height: 16,
      color: "var(--cyan)"
    }
  }), "300+ elektrana ugra\u0111eno kroz mre\u017Eu certificiranih partnera."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, aside)));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/PhotoPlaceholder.jsx
try { (() => {
/**
 * PhotoPlaceholder — branded stand-in for a missing real photo.
 * Midnight surface + product line-icon watermark + cyan glow + "Uskoro foto" pill.
 * (Per brand guidelines §7 — never ship a broken image.)
 */
function PhotoPlaceholder({
  icon = "sun",
  label = "Uskoro foto",
  height = 360,
  radius = "var(--r)",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      borderRadius: radius,
      background: "var(--midnight)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: "70%",
      aspectRatio: "1",
      right: "-12%",
      top: "-30%",
      background: "radial-gradient(circle, rgba(0,206,241,.20), transparent 62%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 64,
      height: 64,
      color: "var(--slate-700)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: 16,
      left: 16,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: ".06em",
      color: "var(--n-400)",
      background: "rgba(255,255,255,.06)",
      border: "1px solid var(--slate-700)",
      padding: "5px 11px",
      borderRadius: "var(--r-pill)"
    }
  }, label));
}
Object.assign(window, {
  PhotoPlaceholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/PhotoPlaceholder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Sections.jsx
try { (() => {
const {
  SectionHeader,
  Card,
  IconChip,
  Badge,
  Stat,
  Button
} = window.LarsoonDesignSystem_0ae6dc;
const {
  PhotoPlaceholder
} = window;
const Section = ({
  dark,
  children,
  style
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    background: dark ? "var(--midnight)" : "var(--white)",
    ...style
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: "var(--maxw)",
    margin: "0 auto",
    padding: "var(--section-pad) var(--gutter)"
  }
}, children));

/* ---- 2 · Trust strip (light) ---- */
function TrustStrip() {
  const items = [{
    icon: "badge-percent",
    tint: "savings",
    big: "do 50 %",
    small: "FZOEU subvencija"
  }, {
    icon: "zap",
    tint: "cyan",
    big: "300+",
    small: "elektrana"
  }, {
    icon: "shield-check",
    tint: "indigo",
    big: "do 25 god",
    small: "jamstvo"
  }, {
    icon: "map-pin",
    tint: "solar",
    big: "Cijela HR",
    small: "pokrivenost"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--n-50)",
      borderBlock: "1px solid var(--n-200)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "28px var(--gutter)",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20
    },
    className: "ls-trust"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.small,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(IconChip, {
    tint: it.tint,
    size: 44
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": it.icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 19,
      letterSpacing: "-.01em",
      fontVariantNumeric: "tabular-nums"
    }
  }, it.big), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13,
      color: "var(--n-500)",
      fontWeight: 500
    }
  }, it.small))))));
}

/* ---- 4 · Why battery (light) ---- */
function WhyBattery() {
  const cards = [{
    icon: "battery-charging",
    tint: "cyan",
    t: "Veća samopotrošnja",
    d: "Više proizvedene energije trošite sami, manje predajete mreži po niskoj cijeni."
  }, {
    icon: "moon-star",
    tint: "indigo",
    t: "Struja i navečer",
    d: "Energiju proizvedenu danju koristite kad vam najviše treba — navečer i noću."
  }, {
    icon: "trending-up",
    tint: "savings",
    t: "Brži povrat",
    d: "Veća samopotrošnja skraćuje povrat investicije."
  }];
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "clamp(32px,5vw,64px)",
      alignItems: "center"
    },
    className: "ls-two"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Net-billing 2026",
    title: "U 2026. se isplati baterija.",
    gradientWord: "baterija.",
    lead: "Od 2026. vrijednost donosi vlastita potro\u0161nja, a ne predaja vi\u0161ka u mre\u017Eu. Baterija podi\u017Ee samopotro\u0161nju s ~30 % na ~70 %."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      marginTop: 28
    }
  }, cards.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(IconChip, {
    tint: c.tint,
    size: 44
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": c.icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 18,
      margin: "2px 0 4px"
    }
  }, c.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 14.5,
      color: "var(--n-500)",
      margin: 0,
      lineHeight: 1.55
    }
  }, c.d)))))), /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    icon: "layout-panel-left",
    label: "Foto \xB7 Huawei inverter + baterija",
    height: 440
  })));
}

/* ---- 5 · How it works (light) ---- */
function HowItWorks({
  onCTA
}) {
  const steps = [{
    n: "1",
    t: "Izračunajte uštedu",
    d: "Ispunite čarobnjak za 3 minute i dobijete personaliziranu ponudu na e-mail."
  }, {
    n: "2",
    t: "Idejni projekt i prijava na Fond",
    d: "Za 199 € pripremamo idejni projekt i obrazac za HEP i FOND — spremni ste za natječaj."
  }, {
    n: "3",
    t: "Ugradnja",
    d: "Naša mreža certificiranih partnera ugrađuje sustav diljem Hrvatske."
  }, {
    n: "4",
    t: "Puštanje u pogon",
    d: "HEP pušta elektranu u pogon i počinje proizvodnja vaše struje."
  }];
  const tints = ["cyan", "savings", "indigo", "solar"];
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      background: "var(--n-50)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Kako funkcionira",
    title: "Od izra\u010Duna do vlastite struje.",
    align: "center",
    maxWidth: 620,
    style: {
      marginInline: "auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "ls-steps"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: "var(--r-pill)",
      background: `var(--${tints[i]}-tint)`,
      color: tints[i] === "cyan" ? "var(--cyan-800)" : `var(--${tints[i]})`,
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 17,
      marginBottom: 16
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 17,
      margin: "0 0 7px",
      lineHeight: 1.25
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13.5,
      color: "var(--n-500)",
      margin: 0,
      lineHeight: 1.5
    }
  }, s.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 15,
      color: "var(--n-600)",
      margin: "0 0 16px",
      fontWeight: 500
    }
  }, "Spremni? Krenite od izra\u010Duna."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 18,
        height: 18
      }
    }),
    onClick: onCTA
  }, "Izra\u010Dunaj u\u0161tedu")));
}

/* ---- 10 · Final CTA (dark, gradient signature) ---- */
function FinalCTA({
  onCTA
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--midnight)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: "auto 0 0 0",
      height: 4,
      background: "var(--grad)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: 700,
      height: 700,
      left: "50%",
      top: -360,
      transform: "translateX(-50%)",
      background: "radial-gradient(circle, rgba(0,206,241,.16), transparent 60%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "var(--section-pad) var(--gutter)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "var(--fs-h2)",
      letterSpacing: "var(--tracking-display)",
      color: "#fff",
      margin: "0 0 28px",
      lineHeight: 1.1
    }
  }, "Va\u0161a u\u0161teda je", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--grad)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "3 minute"), " ", "daleko."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 20,
        height: 20
      }
    }),
    onClick: onCTA
  }, "Izra\u010Dunaj u\u0161tedu")));
}

/* ---- 12 · Footer (very dark) ---- */
function Footer() {
  const cols = [{
    h: "Rješenja",
    items: ["Projektiranje", "Montaža", "Nadzor", "Održavanje"]
  }, {
    h: "Proizvodi",
    items: ["Solarne elektrane", "Baterijski sustavi", "Punjači za EV"]
  }, {
    h: "Tvrtka",
    items: ["O nama", "Radovi", "Reference", "Kontakt"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--footer)",
      color: "var(--n-400)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "64px var(--gutter) 48px",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 32
    },
    className: "ls-footer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/larsoon-logo-light.png",
    alt: "Larsoon",
    style: {
      height: 32,
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13.5,
      lineHeight: 1.7,
      margin: 0,
      maxWidth: "30ch"
    }
  }, "Solarne elektrane i baterijski sustavi diljem Hrvatske.", /*#__PURE__*/React.createElement("br", null), "info@larsoon.com \xB7 +385 99 249 5949", /*#__PURE__*/React.createElement("br", null), "Trg Ljube Babi\u0107a 28, 10450 Jastrebarsko", /*#__PURE__*/React.createElement("br", null), "OIB: 59474815786")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 13,
      color: "var(--n-300)",
      marginBottom: 14,
      letterSpacing: ".02em"
    }
  }, c.h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, c.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13.5,
      color: "var(--n-400)",
      textDecoration: "none"
    },
    onMouseEnter: e => e.currentTarget.style.color = "var(--cyan)",
    onMouseLeave: e => e.currentTarget.style.color = "var(--n-400)"
  }, it))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--slate-800)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "20px var(--gutter)",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Larsoon Energy d.o.o."), /*#__PURE__*/React.createElement("span", null, "Pravila privatnosti \xB7 Kola\u010Di\u0107i \xB7 Impressum"))));
}
Object.assign(window, {
  TrustStrip,
  WhyBattery,
  HowItWorks,
  FinalCTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wizard/QuoteCard.jsx
try { (() => {
const {
  Badge
} = window.LarsoonDesignSystem_0ae6dc;
const hr = (n, dec = 0) => n.toLocaleString("hr-HR", {
  minimumFractionDigits: dec,
  maximumFractionDigits: dec
});

/**
 * QuoteCard — the PDF "cover moment": midnight surface, gradient top rule, light
 * logo, quote ID, big savings figure, spec rows, subvencija badge.
 */
function QuoteCard({
  data
}) {
  const rows = [{
    k: "Snaga sustava",
    v: `${hr(data.power, 1)} kWp · ${data.panels} ploča`
  }, {
    k: "Godišnji prinos",
    v: `${hr(data.yield)} kWh`
  }, {
    k: "Baterija",
    v: data.battery ? `${data.batteryKwh} kWh` : "—"
  }, {
    k: "Efektivni trošak (nakon subvencije)",
    v: `${hr(data.effectiveCost, 2)} €`,
    save: true
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--midnight)",
      color: "#fff",
      borderRadius: "var(--r-lg)",
      padding: 30,
      overflow: "hidden",
      boxShadow: "var(--shadow-xl)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: "0 0 auto 0",
      height: 3,
      background: "var(--grad)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 16,
      borderBottom: "1px solid var(--slate-700)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/larsoon-logo-light.png",
    alt: "Larsoon",
    style: {
      height: 24
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--n-400)"
    }
  }, data.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--cyan)",
      marginTop: 22
    }
  }, "Godi\u0161nja u\u0161teda"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 46,
      letterSpacing: "-.02em",
      marginTop: 6,
      fontVariantNumeric: "tabular-nums"
    }
  }, hr(data.annualSaving, 2), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      color: "var(--n-400)"
    }
  }, "\u20AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 16,
      padding: "11px 0",
      borderBottom: i < rows.length - 1 ? "1px solid var(--slate-800)" : "none",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--n-300)"
    }
  }, r.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontVariantNumeric: "tabular-nums",
      textAlign: "right",
      color: r.save ? "var(--cyan)" : "#fff"
    }
  }, r.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "savings-on-dark",
    dot: true
  }, "FZOEU subvencija 50 % \xB7 izravan povrat")));
}
Object.assign(window, {
  QuoteCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wizard/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wizard/WizardFlow.jsx
try { (() => {
const {
  WizardSteps,
  Slider,
  Checkbox,
  Input,
  Button,
  IconChip,
  Eyebrow
} = window.LarsoonDesignSystem_0ae6dc;
const {
  QuoteCard
} = window;
const hr = (n, dec = 0) => n.toLocaleString("hr-HR", {
  minimumFractionDigits: dec,
  maximumFractionDigits: dec
});

/* Selectable option tile */
function OptionCard({
  icon,
  label,
  sub,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      textAlign: "left",
      background: selected ? "var(--cyan-tint)" : "var(--white)",
      border: `1.5px solid ${selected ? "var(--cyan)" : "var(--n-200)"}`,
      borderRadius: "var(--r)",
      padding: "16px 18px",
      cursor: "pointer",
      width: "100%",
      boxShadow: selected ? "0 0 0 4px rgba(0,206,241,.14)" : "none",
      transition: "border-color var(--dur) var(--ease), background var(--dur) var(--ease)",
      fontFamily: "var(--font-text)"
    }
  }, /*#__PURE__*/React.createElement(IconChip, {
    tint: "cyan",
    size: 42
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 15.5,
      color: "var(--ink)"
    }
  }, label), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      color: "var(--n-500)",
      marginTop: 2
    }
  }, sub)));
}
const STEPS = ["Regija", "Krov", "Račun", "Sustav", "Kontakt", "Ponuda"];
function WizardFlow() {
  const [step, setStep] = React.useState(0);
  const [s, setS] = React.useState({
    region: "Središnja HR",
    roof: "Kosi crijep",
    orient: "Jug",
    bill: 120,
    power: 6.5,
    battery: true,
    name: "",
    email: "",
    agree: false
  });
  const set = patch => setS(prev => ({
    ...prev,
    ...patch
  }));
  React.useEffect(() => {
    const t = setTimeout(() => window.lucide && lucide.createIcons({
      attrs: {
        "stroke-width": 1.7
      }
    }), 50);
    return () => clearTimeout(t);
  }, [step, s.battery]);

  // derived illustrative quote
  const yield_ = Math.round(s.power * 1160);
  const panels = Math.round(s.power / 0.47);
  const invest = Math.round(s.power * 1320 + (s.battery ? 5200 : 0));
  const effectiveCost = invest * 0.5;
  const annualSaving = Math.round(s.bill * 12 * (s.battery ? 0.72 : 0.46));
  const quote = {
    id: "LE-2026-6900",
    power: s.power,
    panels,
    yield: yield_,
    battery: s.battery,
    batteryKwh: 10,
    effectiveCost,
    annualSaving
  };
  const canNext = step !== 4 || s.email.includes("@") && s.agree;
  const titles = [{
    eye: "Korak 1 / 6",
    t: "Gdje se nalazi vaš objekt?"
  }, {
    eye: "Korak 2 / 6",
    t: "Kakav je vaš krov?"
  }, {
    eye: "Korak 3 / 6",
    t: "Koliki je mjesečni račun za struju?"
  }, {
    eye: "Korak 4 / 6",
    t: "Dimenzionirajte sustav."
  }, {
    eye: "Korak 5 / 6",
    t: "Kamo šaljemo vašu ponudu?"
  }, {
    eye: "Gotovo",
    t: "Vaša personalizirana ponuda."
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--n-50)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--midnight)",
      padding: "16px var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/larsoon-logo-light.png",
    alt: "Larsoon",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--n-400)"
    }
  }, "\u010Carobnjak za ponudu"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "clamp(28px,5vw,56px) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(WizardSteps, {
    steps: STEPS,
    current: step
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--white)",
      border: "1px solid var(--n-200)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow)",
      padding: "clamp(24px,4vw,40px)",
      maxWidth: step === 5 ? 560 : 720,
      marginInline: "auto"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, titles[step].eye), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "clamp(22px,3vw,30px)",
      letterSpacing: "-.02em",
      margin: "10px 0 26px",
      lineHeight: 1.12
    }
  }, titles[step].t), step === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, [["Sjever HR", "mountain", "Zagreb, Varaždin…"], ["Središnja HR", "trees", "Sisak, Karlovac…"], ["Istra / Primorje", "waves", "Rijeka, Pula…"], ["Dalmacija", "sun", "Split, Zadar…"]].map(([r, ic, sub]) => /*#__PURE__*/React.createElement(OptionCard, {
    key: r,
    icon: ic,
    label: r,
    sub: sub,
    selected: s.region === r,
    onClick: () => set({
      region: r
    })
  }))), step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--n-600)",
      marginBottom: 10
    }
  }, "Tip krova"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12
    }
  }, [["Kosi crijep", "house"], ["Ravni krov", "square"], ["Limeni krov", "layers"]].map(([r, ic]) => /*#__PURE__*/React.createElement(OptionCard, {
    key: r,
    icon: ic,
    label: r,
    selected: s.roof === r,
    onClick: () => set({
      roof: r
    })
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--n-600)",
      marginBottom: 10
    }
  }, "Orijentacija"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, [["Jug", "compass"], ["Istok / Zapad", "arrow-left-right"]].map(([r, ic]) => /*#__PURE__*/React.createElement(OptionCard, {
    key: r,
    icon: ic,
    label: r,
    selected: s.orient === r,
    onClick: () => set({
      orient: r
    })
  }))))), step === 2 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Slider, {
    label: "Prosje\u010Dni mjese\u010Dni ra\u010Dun",
    unit: "\u20AC/mj",
    min: 40,
    max: 400,
    step: 10,
    value: s.bill,
    onChange: v => set({
      bill: v
    }),
    formatValue: v => hr(v)
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 13.5,
      color: "var(--n-500)",
      marginTop: 18,
      lineHeight: 1.5
    }
  }, "Procjenu radimo na temelju godi\u0161nje potro\u0161nje. To\u010Dan podatak unosite kasnije iz HEP ra\u010Duna.")), step === 3 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Slider, {
    label: "Snaga elektrane",
    unit: "kWp",
    min: 3,
    max: 12,
    step: 0.5,
    value: s.power,
    onChange: v => set({
      power: v
    }),
    formatValue: v => hr(v, 1)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 18,
      borderTop: "1px solid var(--n-100)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: s.battery,
    onChange: e => set({
      battery: e.target.checked
    }),
    label: "Dodaj bateriju (podi\u017Ee samopotro\u0161nju na ~70 %)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      marginTop: 24,
      padding: "18px 20px",
      background: "var(--n-50)",
      borderRadius: "var(--r)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: "-.02em",
      fontVariantNumeric: "tabular-nums"
    }
  }, hr(yield_), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--n-400)"
    }
  }, " kWh")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--n-500)",
      fontWeight: 600
    }
  }, "Godi\u0161nji prinos")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: "-.02em",
      fontVariantNumeric: "tabular-nums"
    }
  }, panels), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--n-500)",
      fontWeight: 600
    }
  }, "Solarnih plo\u010Da")))), step === 4 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Ime i prezime",
    placeholder: "Ivan Horvat",
    value: s.name,
    onChange: e => set({
      name: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    type: "email",
    placeholder: "vi@email.com",
    value: s.email,
    onChange: e => set({
      email: e.target.value
    }),
    required: true,
    helper: "Personaliziranu PDF ponudu \u0161aljemo na ovu adresu."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: s.agree,
    onChange: e => set({
      agree: e.target.checked
    }),
    label: "Sla\u017Eem se s pravilima privatnosti i primanjem ponude."
  })), step === 5 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(QuoteCard, {
    data: quote
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "mail",
      style: {
        width: 18,
        height: 18
      }
    }),
    style: {
      width: "100%",
      marginTop: 20
    },
    onClick: () => alert("Ponuda poslana na " + (s.email || "vašu e-mail adresu"))
  }, "Po\u0161alji ponudu na e-mail"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: 12,
      color: "var(--n-400)",
      marginTop: 12,
      textAlign: "center",
      lineHeight: 1.5
    }
  }, "Ilustrativne vrijednosti. Vrijedi do 21.06.2026. \xB7 ", quote.id)), step < 5 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 32,
      paddingTop: 22,
      borderTop: "1px solid var(--n-100)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(p => Math.max(0, p - 1)),
    disabled: step === 0,
    style: {
      background: "none",
      border: "none",
      cursor: step === 0 ? "default" : "pointer",
      fontFamily: "var(--font-text)",
      fontSize: 14,
      fontWeight: 600,
      color: step === 0 ? "var(--n-300)" : "var(--n-500)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 16,
      height: 16
    }
  }), " Natrag"), /*#__PURE__*/React.createElement(Button, {
    variant: canNext ? "primary" : "ghost",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 18,
        height: 18
      }
    }),
    onClick: () => canNext && setStep(p => Math.min(5, p + 1)),
    disabled: !canNext
  }, step === 4 ? "Izradi ponudu" : "Sljedeći korak")), step === 5 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(0),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-text)",
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--cyan-800)"
    }
  }, "\u2190 Zapo\u010Dni ispo\u010Detka"))))));
}
Object.assign(window, {
  WizardFlow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wizard/WizardFlow.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.IconChip = __ds_scope.IconChip;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.WizardSteps = __ds_scope.WizardSteps;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Slider = __ds_scope.Slider;

})();
