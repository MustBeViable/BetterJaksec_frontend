import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";

import en from "date-fns/locale/en-US";
import fi from "date-fns/locale/fi";
import de from "date-fns/locale/de";
import ja from "date-fns/locale/ja";
import zhCN from "date-fns/locale/zh-CN";
import faIR from "date-fns/locale/fa-IR";

registerLocale("en", en);
registerLocale("fi", fi);
registerLocale("de", de);
registerLocale("ja", ja);
registerLocale("zh", zhCN);
registerLocale("fa", faIR);

const GregorianDatePicker = ({
  value,
  onChange,
  className,
  placeholderText,
  showCloseButton = true,
}) => {
  const { i18n } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = value ? new Date(value) : null;

  const handleChange = (date) => {
    if (!date) {
      onChange("");
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;
      onChange(formatted);
    }
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
      }}
    >
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        &lt;
      </button>

      <span>
        {date.toLocaleString(i18n.language, {
          month: "long",
          year: "numeric",
        })}
      </span>

      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        &gt;
      </button>

      {showCloseButton && (
        <button onClick={handleClose} style={{ marginLeft: "auto" }}>
          ✕
        </button>
      )}
    </div>
  );

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      locale={i18n.language}
      dateFormat="yyyy-MM-dd"
      className={className}
      placeholderText={placeholderText}
      open={isOpen}
      onClickOutside={handleClose}
      onInputClick={handleInputClick}
      renderCustomHeader={CustomHeader}
      popperPlacement="bottom-start"
      style={{ width: "100%" }}
    />
  );
};

export default GregorianDatePicker;