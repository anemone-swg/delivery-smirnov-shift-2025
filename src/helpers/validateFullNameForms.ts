import { toast } from "react-toastify";

const specialChars = "`‘\\-";
const cyrillic = /[а-яё]/i;
const latin = /[a-z]/i;

/**
 * Проверяет, содержит ли строка символы только одного алфавита: кириллицу или латиницу.
 *
 * @param {string} str - Проверяемая строка.
 * @returns {boolean} True, если используется только один алфавит. False — если оба алфавита смешаны.
 */
const hasMixedAlphabets = (str: string): boolean => {
  const hasCyr = cyrillic.test(str);
  const hasLat = latin.test(str);
  return !(hasCyr && hasLat);
};

/**
 * Проверяет, содержат ли фамилия, имя и отчество только один алфавит.
 * При обнаружении смешанных алфавитов выводит предупреждение.
 *
 * @param {string} lastName - Фамилия.
 * @param {string} firstName - Имя.
 * @param {string} middleName - Отчество.
 * @returns {boolean} True, если используется только один алфавит. False — если оба алфавита смешаны.
 */
export const hasMixedAlphabetsOfFullNameForm = (
  lastName: string,
  firstName: string,
  middleName: string,
): boolean => {
  const fullName = `${lastName} ${firstName} ${middleName}`.trim();

  if (!hasMixedAlphabets(fullName)) {
    toast.warning("Значения заданы с использованием разных алфавитов.");
    return false;
  }

  return true;
};

/**
 * Валидирует отдельное поле ФИО по набору условий:
 * обязательность, длина, допустимые символы и единый алфавит.
 *
 * @param {string} value - Значение поля (имя, фамилия, отчество).
 * @param {number} min - Минимальная длина строки.
 * @param {number} max - Максимальная длина строки.
 * @param {boolean} [noStartsOrEndsWithSpecial=false] - Проверять ли отсутствие спецсимволов в начале/конце.
 * @param {boolean} [required=true] - Является ли поле обязательным.
 * @returns {boolean} True, если валидация пройдена. False — если найдены ошибки.
 */
export const validateFullNameField = (
  value: string,
  min: number,
  max: number,
  noStartsOrEndsWithSpecial: boolean = false,
  required: boolean = true,
): boolean => {
  if (!value && !required) return true;

  if (!value && required) {
    toast.warning("Не заполнены обязательные поля.");
    return false;
  }

  if (value.length < min || value.length > max) {
    toast.warning("Некорректный формат.");
    return false;
  }

  if (!hasMixedAlphabets(value)) {
    toast.warning(
      "Значение должно быть задано с использованием одного из следующих алфавитов: кириллического, латинского.",
    );
    return false;
  }

  if (noStartsOrEndsWithSpecial) {
    if (
      specialChars.includes(value[0]) ||
      specialChars.includes(value[value.length - 1])
    ) {
      toast.warning("Некорректный формат.");
      return false;
    }
  }

  const validCharsRegExp = new RegExp(`^[a-zа-яё${specialChars} ]+$`, "i");
  if (!validCharsRegExp.test(value)) {
    toast.warning("Некорректный формат.");
    return false;
  }

  const consecutiveSpecialCharsRegExp = new RegExp(`[${specialChars}]{2,}`);
  if (consecutiveSpecialCharsRegExp.test(value)) {
    toast.warning("Некорректный формат.");
    return false;
  }

  return true;
};

/**
 * Валидирует номер телефона по формату +7XXXXXXXXXX.
 *
 * @param {string} phone - Номер телефона.
 * @returns {boolean} True, если формат корректен. False — если номер неверного формата.
 */
export const validatePhone = (phone: string): boolean => {
  const phonePattern = /^\+7\d{10}$/;
  if (!phonePattern.test(phone)) {
    toast.warning("Неверный формат телефона. Введите в формате +7XXXXXXXXXX");
    return false;
  }

  return true;
};
