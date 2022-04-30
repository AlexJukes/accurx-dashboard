import axios from "axios";
import { stubPatientData } from "../../test/stubs/patientData.stub";
import { fetchPatientData } from "../fetchPatientData";

jest.mock("axios");
describe("fetchPatientData", () => {
  const mockUrl = "some-url";

  afterEach(jest.resetAllMocks);

  it("correctly fetches patient information from the given endpoint", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: stubPatientData });

    const res = await fetchPatientData(mockUrl);
    expect(axios.get).toHaveBeenCalledWith(mockUrl);
    expect(res).toEqual(stubPatientData);
  });
});
