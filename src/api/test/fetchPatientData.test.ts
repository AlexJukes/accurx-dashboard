import axios from "axios";
import { fetchPatientData } from "../fetchPatientData";

jest.mock("axios");
describe("fetchPatientData", () => {
  const mockPatientData = [
    {
      firstName: "Gelato",
      lastName: "Al Cioccolato",
      vaccineDate: 1637877061,
      vaccineType: "Pfizer",
      nhsNumber: "4584318425",
      id: "1",
    },
  ];
  const mockUrl = "some-url";

  it("correctly fetches patient information from the given endpoint", async () => {
    // arrange

    (axios.get as jest.Mock).mockResolvedValueOnce(mockPatientData);

    const res = await fetchPatientData(mockUrl);
    expect(axios.get).toHaveBeenCalledWith(mockUrl);
    expect(res).toEqual(mockPatientData);
  });
});
