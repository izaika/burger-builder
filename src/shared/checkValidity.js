export default (value, rules) => {
  if (!rules) return true;
  let isValid = true;

  if (rules.required) isValid = !!value.trim().length && isValid;
  if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
  if (rules.maxLength) isValid = value.length <= rules.minLength && isValid;

  return isValid;
};
