export const validateInput = (
  value: string,
  type: "address" | "amount" | "percent" | "any"
): boolean => {
  const regexMapping = {
    address: /^[0-9A-Za-z]{0,42}$/,
    amount: /^\d*\.?\d{0,18}$/,
    percent: /^(100|[0-9]{0,2})$/,
    any: /^[0-9A-Za-z\s\S]*$/,
  };
  return regexMapping[type].test(value);
};
