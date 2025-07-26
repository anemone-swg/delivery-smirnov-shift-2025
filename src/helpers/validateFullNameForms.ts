import { toast } from "react-toastify";

const specialChars = "`‘\\-";
const cyrillic = /[а-яё]/i;
const latin = /[a-z]/i;

const hasMixedAlphabets = (str: string) => {
  const hasCyr = cyrillic.test(str);
  const hasLat = latin.test(str);
  return !(hasCyr && hasLat);
};

export const hasMixedAlphabetsOfFullNameForm = (
  lastName: string,
  firstName: string,
  middleName: string,
) => {
  const fullName = `${lastName} ${firstName} ${middleName}`.trim();

  if (!hasMixedAlphabets(fullName)) {
    toast.warning("Значения заданы с использованием разных алфавитов.");
    return false;
  }

  return true;
};

export const validateFullNameField = (
  value: string,
  min: number,
  max: number,
  noStartsOrEndsWithSpecial = false,
  required = true,
) => {
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

export const validatePhone = (phone: string) => {
  const phonePattern = /^\+7\d{10}$/;
  if (!phonePattern.test(phone)) {
    toast.warning("Неверный формат телефона. Введите в формате +7XXXXXXXXXX");
    return false;
  }

  return true;
};
