import { screen, render } from "@testing-library/react";
import { PatientInformation } from "..";
import { fetchPatientData } from "../../../api/fetchPatientData";
import { PatientDataTable } from "../../PatientDataTable";

jest.mock("../../../api/fetchPatientData");
jest.mock("../../PatientDataTable");

describe("PatientInformation", () => {
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

  beforeEach(() => {
    (PatientDataTable as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-patient-data-table" />
    ));
  });

  it("renders", async () => {
    render(<PatientInformation />);
    expect(await screen.findByText("Patient Information")).toBeInTheDocument();
  });

  it("shows a loading message until data has been fetched", async () => {
    render(<PatientInformation />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-patient-data-table")
    ).not.toBeInTheDocument();
  });

  it("renders the PatientDataTable with correct info once data has been fetched", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValueOnce({
      data: mockPatientData,
    });
    render(<PatientInformation />);
    expect(
      await screen.findByTestId("mock-patient-data-table")
    ).toBeInTheDocument();
  });
});
