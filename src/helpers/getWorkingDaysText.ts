/**
 * Возвращает строку с правильно склонённым словом "рабочий день"
 * в зависимости от количества дней.
 *
 * @param {number} days - Количество рабочих дней.
 * @returns {string} Строка с числом и правильно склонённым словом.
 *
 * @example
 * getWorkingDaysText(1); // "1 рабочий день"
 * getWorkingDaysText(3); // "3 рабочих дня"
 * getWorkingDaysText(7); // "7 рабочих дней"
 */

const getWorkingDaysText = (days: number): string => {
  const mod10 = days % 10;
  const mod100 = days % 100;

  if (mod10 === 1 && mod100 !== 11) return `${days} рабочий день`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return `${days} рабочих дня`;
  return `${days} рабочих дней`;
};

export default getWorkingDaysText;
