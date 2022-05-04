import { screen, render, waitFor } from "@testing-library/react";
import { FullListPatientView } from "..";
import { fetchPatientData } from "../../../../../api/fetchPatientData";
import { sortDataByName } from "../../../../../logic/sortDataByName";
import {
  stubPatientData,
  stubPatientDataSortedByAsc,
} from "../../../../../test/stubs/patientData.stub";

import { PatientDataTable } from "../../PatientDataTable";

jest.mock("../../../../../api/fetchPatientData");
jest.mock("../../PatientDataTable");
jest.mock("../../../../../logic/sortDataByName");

describe("FullListPatientView", () => {
  beforeEach(() => {
    (PatientDataTable as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-patient-data-table" />
    ));
  });

  afterEach(jest.resetAllMocks);

  it("shows a loading message until data has been fetched", async () => {
    render(<FullListPatientView sortBy="asc" />);

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

    render(<FullListPatientView sortBy="asc" />);

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
    (fetchPatientData as jest.Mock).mockRejectedValueOnce(new Error("Uh oh!"));

    render(<FullListPatientView sortBy="asc" />);

    expect(await screen.findByText("Uh oh!")).toBeInTheDocument();
  });

  it("sorts the data by ascending or descending depending on prop", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue(stubPatientData);

    (fetchPatientData as jest.Mock).mockResolvedValueOnce(stubPatientData);

    // initial render
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);

    // new props
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);

    const { rerender } = render(<FullListPatientView sortBy="asc" />);

    await waitFor(() => expect(sortDataByName).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(sortDataByName).toHaveBeenCalledWith(stubPatientData, "asc")
    );

    rerender(<FullListPatientView sortBy="desc" />);

    await waitFor(() => expect(sortDataByName).toHaveBeenCalledTimes(2));
    await waitFor(() =>
      expect(sortDataByName).toHaveBeenNthCalledWith(2, stubPatientData, "desc")
    );
  });
});
