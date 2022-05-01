import {
  stubPatientData,
  stubPatientDataSortedByAsc,
  stubPatientDataSortedByDesc,
} from "../../test/stubs/patientData.stub";
import { sortDataByName } from "../sortDataByName";

describe("sortDataByName", () => {
  it("returns a new array of patient data sorted by ascending order of last name", () => {
    expect(sortDataByName(stubPatientData, "asc")).toEqual(
      stubPatientDataSortedByAsc
    );
  });

  it("returns a new array of patient data sorted by descending order of last name", () => {
    expect(sortDataByName(stubPatientData, "desc")).toEqual(
      stubPatientDataSortedByDesc
    );
  });
});
