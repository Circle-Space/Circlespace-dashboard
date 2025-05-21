export const SIDEBAR_POSITION = {
  LEFT: "left",
  RIGHT: "right",
};

export const SIDEBAR_BEHAVIOR = {
  STICKY: "sticky",
  FIXED: "fixed",
  COMPACT: "compact",
};

export const LAYOUT = {
  FLUID: "fluid",
  BOXED: "boxed",
};

export const THEME = {
  DEFAULT: "default",
  COLORED: "colored",
  DARK: "dark",
  LIGHT: "light",
  CUSTOM: "custom",
};

// These are the available theme options shown on the UI
export const THEME_OPTIONS = [
  {
    name: "Default",
    value: THEME.DEFAULT,
  },
  {
    name: "Colored",
    value: THEME.COLORED,
  },
  {
    name: "Dark",
    value: THEME.DARK,
  },
  {
    name: "Light",
    value: THEME.LIGHT,
  },
];

export const THEME_PALETTE_LIGHT = {
  primary: "#3B82EC",
  "primary-dark": "#1659c7",
  "primary-light": "#84aef2",
  secondary: "#495057",
  success: "#4BBF73",
  info: "#1F9BCF",
  warning: "#f0ad4e",
  danger: "#d9534f",
  white: "#fff",
  "gray-100": "#f4f7f9",
  "gray-200": "#e2e8ee",
  "gray-300": "#dee6ed",
  "gray-400": "#ced4da",
  "gray-500": "#adb5bd",
  "gray-600": "#6c757d",
  "gray-700": "#495057",
  "gray-800": "#020202",
  "gray-900": "#212529",
  black: "#000",
};

export const THEME_PALETTE_DARK = {
  ...THEME_PALETTE_LIGHT,
  "primary-dark": "#84aef2",
  "primary-light": "#1659c7",
  white: "#293042",
  "gray-100": "#3e4555",
  "gray-200": "#545968",
  "gray-300": "#696e7b",
  "gray-400": "#7f838e",
  "gray-500": "#9498a1",
  "gray-600": "#a9acb3",
  "gray-700": "#bfc1c6",
  "gray-800": "#d4d6d9",
  "gray-900": "#eaeaec",
  black: "#fff",
};

export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  
export const phoneTypesOptions = [
  { value: "", name: "Select Phone Type" },
  { value: "Mobile", name: "Mobile" },
  { value: "Home", name: "Home" },
  { value: "Work", name: "Work" },
  { value: "Fax", name: "Fax" },
  { value: "Business", name: "Business" },
  { value: "Other", name: "Other" },
];

export const countryCodeOptions = [
  { value: "", name: "Select Country Code" },
  { code: "+1", name: "U.S.A" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
  { code: "+91", name: "India" },
  { code: "+86", name: "China" },
  { code: "+81", name: "Japan" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+55", name: "Brazil" },
  { code: "+7", name: "Russia" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+27", name: "South Africa" },
  { code: "+82", name: "South Korea" },
  { code: "+31", name: "Netherlands" },
  { code: "+46", name: "Sweden" },
  { code: "+47", name: "Norway" },
  { code: "+45", name: "Denmark" },
  { code: "+358", name: "Finland" },
  { code: "+64", name: "New Zealand" },
  { code: "+90", name: "Turkey" },
  { code: "+60", name: "Malaysia" },
  { code: "+63", name: "Philippines" },
  { code: "+65", name: "Singapore" },
  { code: "+66", name: "Thailand" },
];
