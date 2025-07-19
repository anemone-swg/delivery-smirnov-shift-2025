import { toast } from "react-toastify";

const specialChars = "`‘'/:;\\-_,.# ";
const cyrillic = /[а-яё]/i;
const latin = /[a-z]/i;

const hasMixedAlphabets = (str) => {
  const hasCyr = cyrillic.test(str);
  const hasLat = latin.test(str);
  return !(hasCyr && hasLat);
};

const startsOrEndsWithSpecial = (str) => {
  return (
    specialChars.includes(str[0]) || specialChars.includes(str[str.length - 1])
  );
};

export const hasMixedAlphabetsOfAddressForm = (
  street,
  houseNumber,
  apartmentNumber,
) => {
  const fullAddress = `${street} ${houseNumber} ${apartmentNumber}`.trim();

  if (!hasMixedAlphabets(fullAddress)) {
    toast.warning("Значения заданы с использованием разных алфавитов.");
    return false;
  }

  return true;
};

export const validateAddressField = (
  value,
  min,
  max,
  required = false,
  isNote = false,
) => {
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
