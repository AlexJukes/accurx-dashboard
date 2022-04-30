import { screen, render } from "@testing-library/react";
import { PatientDashboard } from "..";
import { fetchPatientData } from "../../../api/fetchPatientData";
import { stubPatientData } from "../../../test/stubs/patientData.stub";
import { PatientDataTable } from "../../PatientDataTable";

jest.mock("../../../api/fetchPatientData");
jest.mock("../../PatientDataTable");

describe("PatientDashboard", () => {
  beforeEach(() => {
    (PatientDataTable as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-patient-data-table" />
    ));
  });

  it("renders", async () => {
    render(<PatientDashboard />);
    expect(await screen.findByText("Patient Information")).toBeInTheDocument();
  });

  it("shows a loading message until data has been fetched", async () => {
    render(<PatientDashboard />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-patient-data-table")
    ).not.toBeInTheDocument();
  });

  it("renders the PatientDataTable with correct info once data has been fetched", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValueOnce(stubPatientData);
    render(<PatientDashboard />);
    expect(
      await screen.findByTestId("mock-patient-data-table")
    ).toBeInTheDocument();
    expect(PatientDataTable).toHaveBeenCalledWith(
      {
        patientData: stubPatientData,
      },
      {}
    );
  });

  it("renders an error message if there was a problem fetching the data", async () => {
    (fetchPatientData as jest.Mock).mockRejectedValueOnce("Uh oh@");
    render(<PatientDashboard />);
    expect(
      await screen.findByText(
        "Looks like something went wrong loading the data"
      )
    ).toBeInTheDocument();
  });
});
