const rtlLanguages = ["fa"];

export const getDirection = (lang) => {
  return rtlLanguages.includes(lang) ? "rtl" : "ltr";
};