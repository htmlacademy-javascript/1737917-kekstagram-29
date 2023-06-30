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

/*Функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

const checkMeeting = (workingDayStart, workingDayEnd, meetingStart, meetingDuration) => {

  const createDataObjectFromString = (timeString) => {
    const timeObjectFromTimeString = { hours: 0, minutes: 0 };
    Object.assign(timeObjectFromTimeString, timeString.split(':').map(Number));
    timeObjectFromTimeString.hours = timeObjectFromTimeString[0];
    timeObjectFromTimeString.minutes = timeObjectFromTimeString[1];
    delete timeObjectFromTimeString[0];
    delete timeObjectFromTimeString[1];
    return new Date(2023, 0, 1, timeObjectFromTimeString.hours, timeObjectFromTimeString.minutes, 0, 0);
  };

  return ((createDataObjectFromString(workingDayStart).getHours() * 60 + createDataObjectFromString(workingDayStart).getMinutes() <= createDataObjectFromString(meetingStart).getHours() * 60 + createDataObjectFromString(meetingStart).getMinutes()) && (createDataObjectFromString(workingDayEnd).getHours() * 60 + createDataObjectFromString(workingDayEnd).getMinutes() >= createDataObjectFromString(meetingStart).getHours() * 60 + createDataObjectFromString(meetingStart).getMinutes() + meetingDuration));
};

checkMeeting('08:00', '17:30', '14:00', 90); // true
checkMeeting('8:0', '10:0', '8:0', 120); // true
checkMeeting('08:00', '14:30', '08:00', 30); // false
checkMeeting('14:00', '17:30', '08:0', 90); // false
checkMeeting('8:00', '17:30', '08:00', 900); // false
