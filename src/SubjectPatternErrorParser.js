module.exports = (subjectPatternError, subject, title) =>
  subjectPatternError.replace('${subject}', subject).replace('${title}', title);
