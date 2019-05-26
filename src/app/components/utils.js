// Return the total number of checkboxes and the number of checked checkboxes inside a given text
export const findCheckboxes = text => {
  const checkboxes = text.match(/\[(\s|x)\]/g) || [];
  const checked = checkboxes.filter(checkbox => checkbox === '[x]').length;
  return { total: checkboxes.length, checked };
};

export const capitalize = string => {
  if (process.env.NODE_ENV !== 'production' && typeof string !== 'string') {
    throw new Error(
      'UTIL: capitalize(string) expects a string as an argument.'
    );
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};
