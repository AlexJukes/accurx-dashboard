import { stubPatientData } from "../../test/stubs/patientData.stub";
import { sortDataByName } from "../sortDataByName";

describe("sortDataByName", () => {
  it("returns a new array of patient data sorted by ascending order of last name", () => {
    const sortedPatientDataAsc = [
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
    ];

    expect(sortDataByName(stubPatientData, "asc")).toEqual(
      sortedPatientDataAsc
    );
  });

  it("returns a new array of patient data sorted by descending order of last name", () => {
    const sortedPatientDataDesc = [
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
    ];

    expect(sortDataByName(stubPatientData, "desc")).toEqual(
      sortedPatientDataDesc
    );
  });
});
