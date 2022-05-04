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

  it("correctly handles 404 response", async () => {
    (axios.get as jest.Mock).mockRejectedValue({ response: { status: 404 } });

    await expect(searchPatientData("someUsername")).rejects.toThrow(
      "Unable to find any users matching that search"
    );
  });

  it("returns generic response for all other error status codes", async () => {
    (axios.get as jest.Mock).mockRejectedValue({ response: { status: 500 } });

    await expect(searchPatientData("someUsername")).rejects.toThrow(
      "Something went wrong. Please refresh the page and try again"
    );
  });
});
