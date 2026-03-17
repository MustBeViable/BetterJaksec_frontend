import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "fi", label: "Suomi" },
  { code: "de", label: "Deutsch" },
  { code: "jp", label: "Japanese" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };

  return (
    <select value={i18n.language} onChange={handleChange}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}