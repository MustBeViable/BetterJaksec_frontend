import { useTranslation } from "react-i18next";
import GregorianDatePicker from "./GregorianDatePicker";
import DatePickerJalali from "./DatePickerJalali";

const LocalizedDatePicker = (props) => {
  const { i18n } = useTranslation();

  if (i18n.language === "fa") {
    return <DatePickerJalali {...props} />;
  }

  return <GregorianDatePicker {...props} />;
};

export default LocalizedDatePicker;