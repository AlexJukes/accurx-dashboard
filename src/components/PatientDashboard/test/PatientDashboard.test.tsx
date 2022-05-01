import { screen, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PatientDashboard } from "..";
import { fetchPatientData } from "../../../api/fetchPatientData";
import { sortDataByName } from "../../../logic/sortDataByName";
import {
  stubPatientData,
  stubPatientDataSortedByAsc,
  stubPatientDataSortedByDesc,
} from "../../../test/stubs/patientData.stub";
import { PatientDataTable } from "../../PatientDataTable";

jest.mock("../../../api/fetchPatientData");
jest.mock("../../PatientDataTable");
jest.mock("../../../logic/sortDataByName");

describe("PatientDashboard", () => {
  beforeEach(() => {
    (PatientDataTable as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-patient-data-table" />
    ));
  });

  afterEach(jest.resetAllMocks);

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

  it("renders the PatientDataTable with correct info sorted by last name once data has been fetched", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValueOnce(stubPatientData);
    (sortDataByName as jest.Mock).mockReturnValueOnce(
      stubPatientDataSortedByAsc
    );

    const expectedProps = {
      patientData: stubPatientDataSortedByAsc,
    };
    const emptyChildComponent = {};

    render(<PatientDashboard />);

    expect(
      await screen.findByTestId("mock-patient-data-table")
    ).toBeInTheDocument();

    expect(sortDataByName).toHaveBeenCalledWith(stubPatientData, "asc");

    expect(PatientDataTable).toHaveBeenCalledWith(
      expectedProps,
      emptyChildComponent
    );
  });

  it("renders an error message if there was a problem fetching the data", async () => {
    (fetchPatientData as jest.Mock).mockRejectedValueOnce("Uh oh!");

    render(<PatientDashboard />);

    expect(
      await screen.findByText(
        "Looks like something went wrong loading the data"
      )
    ).toBeInTheDocument();
  });

  it("toggles sorting the data by ascending or descending when clicking 'Sort by name' button", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValueOnce(stubPatientData);

    // initial render
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);

    //button click 1
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);

    // button click 2
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);

    render(<PatientDashboard />);

    const button = await screen.findByText(/Sort by name/);

    expect(sortDataByName).toHaveBeenCalledTimes(1);
    expect(sortDataByName).toHaveBeenCalledWith(stubPatientData, "asc");

    act(() => {
      button.click();
    });
    expect(sortDataByName).toHaveBeenCalledTimes(2);

    expect(sortDataByName).toHaveBeenNthCalledWith(2, stubPatientData, "desc");
    act(() => {
      button.click();
    });
    expect(sortDataByName).toHaveBeenCalledTimes(3);

    expect(sortDataByName).toHaveBeenNthCalledWith(3, stubPatientData, "asc");
  });
});
