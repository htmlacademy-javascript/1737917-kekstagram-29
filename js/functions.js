function checkStringLength(string, maxLength) {
  return (string.length <= maxLength);
}

function checkStringIsPalindrome(string) {
  const normolizedString = string.replaceAll(' ', '').toLowerCase();
  let resultString = '';
  for (let i = (normolizedString.length - 1); i >= 0; i--) {
    resultString += normolizedString[i];
  }
  return (normolizedString === resultString);
}

function extractingNumbersFromString(string) {
  const stringToStrig = string.toString();
  let resultString = '';
  for (let i = 0; i <= (stringToStrig.length - 1); i++) {
    if (!Number.isNaN(parseInt(stringToStrig[i], 10))) {
      resultString += stringToStrig[i];
    }
  }
  return parseInt(resultString, 10);
}
