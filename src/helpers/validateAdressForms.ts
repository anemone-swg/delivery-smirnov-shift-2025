import { toast } from "react-toastify";

const specialChars = "`‘'/:;\\-_,.# ";
const cyrillic = /[а-яё]/i;
const latin = /[a-z]/i;

/**
 * Возвращает false, если значение задано с использованием двух алфавитов.
 *
 * @param {string} str - Улица/номер дома/номер квартиры
 * @returns {boolean} True, если используется только один алфавит; иначе false
 * */
const hasMixedAlphabets = (str: string): boolean => {
  const hasCyr = cyrillic.test(str);
  const hasLat = latin.test(str);
  return !(hasCyr && hasLat);
};

const startsOrEndsWithSpecial = (str: string) => {
  return (
    specialChars.includes(str[0]) || specialChars.includes(str[str.length - 1])
  );
};

/**
 * Возвращает false, если значения во всей форме заданы с использованием двух алфавитов.
 *
 * @param street - улица
 * @param house - номер дома
 * @param apartment - номер квартиры
 * @returns {boolean} True, если используется только один алфавит; иначе false
 */
export const hasMixedAlphabetsOfAddressForm = (
  street: string,
  house: string,
  apartment: string,
): boolean => {
  const fullAddress = `${street} ${house} ${apartment}`.trim();

  if (!hasMixedAlphabets(fullAddress)) {
    toast.warning("Значения заданы с использованием разных алфавитов.");
    return false;
  }

  return true;
};

/**
 * Проводит валидацию этапа формы. Вернет true в случае успеха.
 *
 * @param value - Улица/номер дома/номер квартиры
 * @param min - Минимальное количество символов
 * @param max - Максимальное количество символов
 * @param [required=false] - Обязательное ли поле
 * @param [isNote=false] - Заметка ли для курьера
 * @returns {boolean} False, если валидация не пройдена. True в случае успеха
 */
export const validateAddressField = (
  value: string,
  min: number,
  max: number,
  required: boolean = false,
  isNote: boolean = false,
): boolean => {
  if (!value && !required) return true;

  if (!value && required) {
    toast.warning("Не заполнены обязательные поля.");
    return false;
  }

  if (value.length < min || value.length > max) {
    toast.warning(`Значение должно быть от ${min} до ${max} символов.`);
    return false;
  }

  if (!isNote && !hasMixedAlphabets(value)) {
    toast.warning(
      "Значение должно быть задано с использованием одного из следующих алфавитов: кириллического, латинского.",
    );
    return false;
  }

  if (!isNote && startsOrEndsWithSpecial(value)) {
    toast.warning("Некорректный формат.");
    return false;
  }

  const validCharsRegExp = new RegExp(`^[a-zа-яё0-9${specialChars}]+$`, "i");
  if (!validCharsRegExp.test(value)) {
    toast.warning("Некорректный формат.");
    return false;
  }

  return true;
};
