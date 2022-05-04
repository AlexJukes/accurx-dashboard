import { screen, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PatientDashboard } from "..";
import { fetchPatientData } from "../../../api/fetchPatientData";
import { sortDataByName } from "../../../logic/sortDataByName";
import { stubPatientData } from "../../../test/stubs/patientData.stub";
import { PatientDataTable } from "../components/PatientDataTable";
import { FullListPatientView } from "../components/FullListPatientView";
import { SearchListPatientView } from "../components/SearchListPatientView";

jest.mock("../../../api/fetchPatientData");
jest.mock("../../PatientDataTable");
jest.mock("../../../logic/sortDataByName");
jest.mock("../../FullListPatientView");
jest.mock("../../SearchListPatientView");

describe("PatientDashboard", () => {
  beforeEach(() => {
    (PatientDataTable as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-patient-data-table" />
    ));

    (FullListPatientView as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-full-list-patient-view" />
    ));

    (SearchListPatientView as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-search-list-patient-view" />
    ));
  });

  afterEach(jest.resetAllMocks);

  it("renders", async () => {
    render(<PatientDashboard />);

    expect(await screen.findByText("Patient Information")).toBeInTheDocument();
  });

  it("shows the FullListPatientView by default", async () => {
    render(<PatientDashboard />);

    expect(
      screen.getByTestId("mock-full-list-patient-view")
    ).toBeInTheDocument();
  });

  it("toggles sorting the data by ascending or descending when clicking 'Sort by name' button", async () => {
    render(<PatientDashboard />);

    const button = await screen.findByText(/Sort by name A-Z/);

    act(() => {
      button.click();
    });

    expect(FullListPatientView).toHaveBeenCalledWith({ sortBy: "desc" }, {});

    expect(await screen.findByText(/Sort by name Z-A/)).toBeInTheDocument();
  });

  it("shows the SearchListPatientView when search initiated", async () => {
    render(<PatientDashboard />);

    const input = await screen.findByLabelText(/Search/);

    fireEvent.change(input, { target: { value: "a" } });
    expect(
      screen.getByTestId("mock-search-list-patient-view")
    ).toBeInTheDocument();
  });
});
