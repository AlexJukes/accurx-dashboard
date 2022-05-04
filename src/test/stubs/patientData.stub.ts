import { Patient } from "../../types";

const stubPatientData = [
  {
    firstName: "Panettone",
    lastName: "Di pere",
    vaccineDate: 1637876941,
    vaccineType: "Pfizer",
    nhsNumber: "6206597660",
    id: "3",
  },
  {
    firstName: "Bucatino",
    lastName: "de Bucatis",
    vaccineDate: 1637876701,
    vaccineType: "AstraZeneca",
    nhsNumber: "4798775436",
    id: "7",
  },
  {
    firstName: "Gnocco",
    lastName: "Gnocchini",
    vaccineDate: 1637876581,
    vaccineType: "AstraZeneca",
    nhsNumber: "7723376707",
    id: "9",
  },
] as Patient[];

const stubPatientDataSortedByAsc = [
  {
    firstName: "Bucatino",
    lastName: "de Bucatis",
    vaccineDate: 1637876701,
    vaccineType: "AstraZeneca",
    nhsNumber: "4798775436",
    id: "7",
  },
  {
    firstName: "Panettone",
    lastName: "Di pere",
    vaccineDate: 1637876941,
    vaccineType: "Pfizer",
    nhsNumber: "6206597660",
    id: "3",
  },
  {
    firstName: "Gnocco",
    lastName: "Gnocchini",
    vaccineDate: 1637876581,
    vaccineType: "AstraZeneca",
    nhsNumber: "7723376707",
    id: "9",
  },
] as Patient[];

const stubPatientDataSortedByDesc = [
  {
    firstName: "Gnocco",
    lastName: "Gnocchini",
    vaccineDate: 1637876581,
    vaccineType: "AstraZeneca",
    nhsNumber: "7723376707",
    id: "9",
  },
  {
    firstName: "Panettone",
    lastName: "Di pere",
    vaccineDate: 1637876941,
    vaccineType: "Pfizer",
    nhsNumber: "6206597660",
    id: "3",
  },
  {
    firstName: "Bucatino",
    lastName: "de Bucatis",
    vaccineDate: 1637876701,
    vaccineType: "AstraZeneca",
    nhsNumber: "4798775436",
    id: "7",
  },
] as Patient[];

export {
  stubPatientData,
  stubPatientDataSortedByAsc,
  stubPatientDataSortedByDesc,
};
