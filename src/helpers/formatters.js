export const formatNumber = (value, decimals = 1, suffix = '') => {
  if (value == null) return '-';
  return Number(value).toFixed(decimals) + suffix;
};