module.exports = function formatMessage(message, values) {
  let formatted = message;
  if (values) {
    Object.entries(values).forEach(([key, value]) => {
      formatted = formatted.replace(new RegExp(`{${key}}`, 'g'), value);
    });
  }
  return formatted;
};
