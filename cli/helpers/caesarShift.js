function caesarShift(text, shift) {
  let string = text;
  string = string.replace(/[A-Z]/g, L =>
    String.fromCharCode(((L.charCodeAt(0) - 65 + shift) % 26) + 65)
  );
  string = string.replace(/[a-z]/g, L =>
    String.fromCharCode(((L.charCodeAt(0) - 97 + shift) % 26) + 97)
  );
  return string;
}

exports.caesarShift = caesarShift;
