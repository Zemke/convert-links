module.exports = (value, classes = []) => {

  if (typeof value !== "string") return value;

  const htmlClasses = classes.length ? ` class="${classes.join(" ")}" ` : " ";

  try {
    // Lookarounds are apparently only supported by Chrome.
    let regexWithProtocol = new RegExp("(?<!@)(\\b(?:http[s]?:\\/\\/)?(?:www\\.)?[a-z0-9-]{3,}?\\.(?:[a-z]{2,})(?:[.a-z0-9-\\/]+)?(?:[^\\s]*)?\\b)", "gi");
    value = value.replace(regexWithProtocol, `<a href="http://$1"${htmlClasses}target="_blank">$1</a>`);
    value = value.replace(/http?:\/\/(http[s]?:\/\/)/gi, '$1');

    const regexForMail = /(\b\S+@\S+\b)/g;
    value = value.replace(regexForMail, '<a href="mailto:$1">$1</a>');
  } catch (e) {
    let regexWithProtocol = /(\b(?:http[s]?:\/\/)?(?:www\.)?[a-z0-9-]{3,}?\.(?:[a-z]{2,})(?:[.a-z0-9-\/]+)?(?:[^\s]*)?\b)/gi;
    value = value.replace(regexWithProtocol, `<a href="http://$1"${htmlClasses}target="_blank">$1</a>`);
    value = value.replace(/http?:\/\/(http[s]?:\/\/)/gi, '$1');
    return value;
  }

  return value;
}

