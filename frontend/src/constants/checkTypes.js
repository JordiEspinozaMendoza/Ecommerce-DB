export function isNumeric(str) {
  console.log(!isNaN(parseFloat(str)) && isFinite(str));
  return !isNaN(parseFloat(str)) && isFinite(str);
}
