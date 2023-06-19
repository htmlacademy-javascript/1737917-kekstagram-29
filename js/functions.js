// Функция для проверки длины строки

const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом

const checkStringIsPalindrome = (string) => {
  const normolizedString = string.replaceAll(' ', '').toLowerCase();
  let resultString = '';
  for (let i = (normolizedString.length - 1); i >= 0; i--) {
    resultString += normolizedString[i];
  }
  return (normolizedString === resultString);
};

// Строка является палиндромом
checkStringIsPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkStringIsPalindrome('ДовОд'); // true
// Это не палиндром
checkStringIsPalindrome('Кекс'); // false
// Это палиндром
checkStringIsPalindrome('Лёша на полке клопа нашёл '); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

const extractingNumbersFromString = (string) => {
  const stringToStrig = string.toString();
  let resultString = '';
  for (let i = 0; i <= (stringToStrig.length - 1); i++) {
    if (!Number.isNaN(parseInt(stringToStrig[i], 10))) {
      resultString += stringToStrig[i];
    }
  }
  return parseInt(resultString, 10);
};

extractingNumbersFromString('2023 год'); // 2023
extractingNumbersFromString('ECMAScript 2022'); // 2022
extractingNumbersFromString('1 кефир, 0.5 батона'); // 105
extractingNumbersFromString('агент 007'); // 7
extractingNumbersFromString('а я томат');// NaN
extractingNumbersFromString(2023);// 2023
extractingNumbersFromString(-1); // 1
extractingNumbersFromString(1.5); // 15
