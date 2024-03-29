import axios from "axios";
import { stubPatientData } from "../../test/stubs/patientData.stub";
import { PATIENT_DATA_ENDPOINT } from "../constants";
import { fetchPatientData } from "../fetchPatientData";

jest.mock("axios");
describe("fetchPatientData", () => {
  afterEach(jest.resetAllMocks);

  it("correctly fetches patient information from the given endpoint", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: stubPatientData });

    const res = await fetchPatientData();
    expect(axios.get).toHaveBeenCalledWith(PATIENT_DATA_ENDPOINT);
    expect(res).toEqual(stubPatientData);
  });
});
