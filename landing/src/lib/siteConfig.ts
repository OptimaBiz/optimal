const env = import.meta.env;

const fallback = {
  siteUrl: "https://optimal.example",
  siteName: "Оптимальный вариант",
  city: "Москва",
  address: "г. Москва, Пресненская наб., 12",
  phone: "+7 (495) 000-00-00",
  email: "expert@optimal.example",
  messengerUrl: "https://t.me/optimal_example",
  messengerLabel: "Защищенный мессенджер",
  formAction: "https://example.com/form-endpoint",
  privacyUrl: "/privacy-policy.html",
  personalDataUrl: "/personal-data.html",
  fontDisplay: "Inter, SF Pro Display, Arial, sans-serif",
  fontText: "Inter, SF Pro Text, Arial, sans-serif",
  colorPaper: "#f7f4ee",
  colorSurface: "#ffffff",
  colorText: "#111111",
  colorMuted: "#5e625f",
  colorLine: "#d9d7d0",
  colorAccent: "#061e5f",
  colorAccentText: "#ffffff",
  colorAmber: "#b98227",
  colorGlass: "rgba(255,255,255,0.72)",
  pageTitle: "Подготовка ОС СМК к подтверждению компетентности",
  pageDescription:
    "Подготовка органов по сертификации систем менеджмента качества к подтверждению компетентности: аудит анкеты, дел, персонала и практической оценки ВКС."
};

const getEnv = (key: string, value: string) => {
  const envValue = env[key];
  return typeof envValue === "string" && envValue.trim() ? envValue : value;
};

export const siteConfig = {
  siteUrl: getEnv("PUBLIC_SITE_URL", fallback.siteUrl),
  siteName: getEnv("PUBLIC_SITE_NAME", fallback.siteName),
  city: getEnv("PUBLIC_COMPANY_CITY", fallback.city),
  address: getEnv("PUBLIC_COMPANY_ADDRESS", fallback.address),
  phone: getEnv("PUBLIC_COMPANY_PHONE", fallback.phone),
  email: getEnv("PUBLIC_COMPANY_EMAIL", fallback.email),
  messengerUrl: getEnv("PUBLIC_COMPANY_MESSENGER_URL", fallback.messengerUrl),
  messengerLabel: getEnv("PUBLIC_COMPANY_MESSENGER_LABEL", fallback.messengerLabel),
  formAction: getEnv("PUBLIC_FORM_ACTION", fallback.formAction),
  privacyUrl: getEnv("PUBLIC_PRIVACY_URL", fallback.privacyUrl),
  personalDataUrl: getEnv("PUBLIC_PERSONAL_DATA_URL", fallback.personalDataUrl),
  fontDisplay: getEnv("PUBLIC_FONT_DISPLAY", fallback.fontDisplay),
  fontText: getEnv("PUBLIC_FONT_TEXT", fallback.fontText),
  colorPaper: getEnv("PUBLIC_COLOR_PAPER", fallback.colorPaper),
  colorSurface: getEnv("PUBLIC_COLOR_SURFACE", fallback.colorSurface),
  colorText: getEnv("PUBLIC_COLOR_TEXT", fallback.colorText),
  colorMuted: getEnv("PUBLIC_COLOR_MUTED", fallback.colorMuted),
  colorLine: getEnv("PUBLIC_COLOR_LINE", fallback.colorLine),
  colorAccent: getEnv("PUBLIC_COLOR_ACCENT", fallback.colorAccent),
  colorAccentText: getEnv("PUBLIC_COLOR_ACCENT_TEXT", fallback.colorAccentText),
  colorAmber: getEnv("PUBLIC_COLOR_AMBER", fallback.colorAmber),
  colorGlass: getEnv("PUBLIC_COLOR_GLASS", fallback.colorGlass),
  pageTitle: getEnv("PUBLIC_PAGE_TITLE", fallback.pageTitle),
  pageDescription: getEnv("PUBLIC_PAGE_DESCRIPTION", fallback.pageDescription)
};

export const cssVariables = `
  --font-display: ${siteConfig.fontDisplay};
  --font-text: ${siteConfig.fontText};
  --color-paper: ${siteConfig.colorPaper};
  --color-surface: ${siteConfig.colorSurface};
  --color-text: ${siteConfig.colorText};
  --color-muted: ${siteConfig.colorMuted};
  --color-line: ${siteConfig.colorLine};
  --color-accent: ${siteConfig.colorAccent};
  --color-accent-text: ${siteConfig.colorAccentText};
  --color-amber: ${siteConfig.colorAmber};
  --color-glass: ${siteConfig.colorGlass};
`;
