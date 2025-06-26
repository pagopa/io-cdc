import { FiscalCode } from "@pagopa/ts-commons/lib/strings.js";

const FIRST_NAME_SET = [
  "Aldo",
  "Alessia",
  "Alessio",
  "Alessandra",
  "Andrea",
  "Antonio",
  "Antonella",
  "Angelo",
  "Davide",
  "Daniela",
  "Enrico",
  "Elisa",
  "Erasmo",
  "Federico",
  "Francesca",
  "Francesco",
  "Giacomo",
  "Ginevra",
  "Giovanni",
  "Giuseppe",
  "Jacopo",
  "Jessica",
  "Michele",
  "Miriana",
  "Luca",
  "Pasquale",
  "Patrizia",
  "Pietro",
  "Simone",
  "Simonetta",
];

const LAST_NAME_SET = [
  "Rossi",
  "Russo",
  "Ferrari",
  "Esposito",
  "Bianchi",
  "Romano",
  "Colombo",
  "Bruno",
  "Ricci",
  "Marino",
  "Costa",
  "Franco",
  "Gallo",
  "Conti",
  "Greco",
  "Martino",
  "Giordano",
  "Rizzo",
  "Mancini",
  "Villa",
  "Mauro",
  "Lombardi",
  "Fontana",
  "Roberto",
  "Barbieri",
  "Moretti",
  "Bianco",
  "Martini",
  "Mariani",
  "Rinaldi",
  "Amato",
  "Galli",
  "Ferrara",
  "Caruso",
  "Leone",
  "Santoro",
  "Longo",
  "Sala",
  "Martinelli",
  "Serra",
  "Marchetti",
];

const generateFirstName = () => {
  const idx = Math.floor(Math.random() * FIRST_NAME_SET.length);
  return FIRST_NAME_SET[idx];
};

const generateLastName = () => {
  const idx = Math.floor(Math.random() * LAST_NAME_SET.length);
  return LAST_NAME_SET[idx];
};

const generateRandomDate = (from: Date, to: Date) =>
  new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));

const generateRandomCharacter = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

const generateRandomNumber = (numberOfDigits: number) => {
  let result = "";
  const numbers = "0123456789";
  for (let i = 0; i < numberOfDigits; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
};

const generateFiscalCode = () => {
  const firstName = generateFirstName();
  const lastName = generateLastName();
  const birthday = generateRandomDate(
    new Date(1940, 0, 1),
    new Date(2000, 0, 1),
  );
  const cuttedFirstName = `${firstName
    .toUpperCase()
    .replace(/[AEIOU]/g, "")}${firstName}${firstName
    .toUpperCase()
    .replace(/[BCDFGHJKLMNPQRSTVWXYZ]/g, "")}`;
  const cuttedLastName = `${lastName
    .toUpperCase()
    .replace(/[AEIOU]/g, "")}${lastName}${firstName
    .toUpperCase()
    .replace(/[BCDFGHJKLMNPQRSTVWXYZ]/g, "")}`;
  const year = `${birthday.getFullYear()}`.substring(2, 4);
  const day = `${
    birthday.getDate() < 10
      ? "0".concat(birthday.getDate().toString())
      : birthday.getDate()
  }`;
  const firstChar = generateRandomCharacter().toUpperCase();
  const secondChar = generateRandomCharacter().toUpperCase();
  const thirdChar = generateRandomCharacter().toUpperCase();
  const number = generateRandomNumber(3);
  return `${cuttedLastName.substring(0, 3)}${cuttedFirstName.substring(
    0,
    3,
  )}${year}${firstChar}${day}${secondChar}${number}${thirdChar}`;
};

export const generateFakeFiscalCodes = (n: number) => {
  // generate random fiscal codes
  const fiscalCodes: FiscalCode[] = [];
  for (let i = 0; i < n; i++) {
    fiscalCodes.push(generateFiscalCode() as FiscalCode);
  }
  return fiscalCodes;
};
