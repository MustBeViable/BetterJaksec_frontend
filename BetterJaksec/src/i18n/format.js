export const formatDate = (date, lang) => {
  return new Intl.DateTimeFormat(lang).format(new Date(date));
};

// Formater, default 1 decimal can be overriedn
export const formatNumber = (num, lang, options = {}) => {
  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  }).format(num);
};

//Integer no decimals
export const formatInteger = (num, lang, options = {}) => {
  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: false,
    ...options,
  }).format(num);
};

// num is percentage value like 44 or 72
export const formatPercent = (num, lang, options = {}) => {
  return new Intl.NumberFormat(lang, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(num / 100);
};
