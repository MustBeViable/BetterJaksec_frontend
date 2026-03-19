import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../contexts/UserContext.jsx";

const languages = [
  { code: "en", label: "English" },
  { code: "fi", label: "Suomi" },
  { code: "de", label: "Deutsch" },
  { code: "jp", label: "日本語" },
  { code: "ch", label: "中文" },
  { code: "fa", label: "فارسی" },
];

export default function LanguageSelector() {
  const { handleLang } = useContext(UserContext);
  const { i18n } = useTranslation("common");

  const handleChange = (evt) => {
    const selectedLang = evt.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
    handleLang();
  };

  return (
    <div className="language-selector">
      <select
        id="languageSelector"
        className="language-selector__select"
        value={i18n.language}
        onChange={handleChange}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
