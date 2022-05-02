import axios from "axios";
import { stubPatientData } from "../../test/stubs/patientData.stub";
import { PATIENT_DATA_ENDPOINT } from "../constants";
import { searchPatientData } from "../searchPatientData";

jest.mock("axios");
describe("fetchPatientData", () => {
  afterEach(jest.resetAllMocks);

  it("correctly appends the search query to the request params", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: stubPatientData });

    const res = await searchPatientData("someUsername");
    expect(axios.get).toHaveBeenCalledWith(PATIENT_DATA_ENDPOINT, {
      params: { search: "someUsername" },
    });
    expect(res).toEqual(stubPatientData);
  });
});
