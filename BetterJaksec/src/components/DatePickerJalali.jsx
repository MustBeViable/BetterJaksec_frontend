import { useRef } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerJalali = ({ value, onChange, className }) => {
  const pickerRef = useRef();

  const getPickerValue = () => {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    pickerRef.current?.closeCalendar();
  };

  return (
    <DatePicker
      ref={pickerRef}
      value={getPickerValue()}
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
      inputClass={className}
      containerStyle={{ position: "relative" }}
      onChange={(date) => {
        if (!date) {
          onChange("");
          return;
        }

        const g = date.toDate();
        const year = g.getFullYear();
        const month = String(g.getMonth() + 1).padStart(2, "0");
        const day = String(g.getDate()).padStart(2, "0");

        onChange(`${year}-${month}-${day}`);
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "35px",
          zIndex: 10,
        }}
      >
        <button
          onMouseDown={handleClose}
          style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: "22px",
            height: "22px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          ✕
        </button>
      </div>
    </DatePicker>
  );
};

export default DatePickerJalali;