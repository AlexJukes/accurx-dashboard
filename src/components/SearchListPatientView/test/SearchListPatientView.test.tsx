import { screen, render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SearchListPatientView } from "..";
import { fetchPatientData } from "../../../api/fetchPatientData";
import { sortDataByName } from "../../../logic/sortDataByName";
import {
  stubPatientData,
  stubPatientDataSortedByAsc,
} from "../../../test/stubs/patientData.stub";

import { PatientDataTable } from "../../PatientDataTable";

jest.mock("../../../api/fetchPatientData");
jest.mock("../../PatientDataTable");
jest.mock("../../../logic/sortDataByName");

describe("SearchListPatientView", () => {
  beforeEach(() => {
    (PatientDataTable as jest.Mock).mockImplementation(() => (
      <div data-testid="mock-patient-data-table" />
    ));
  });

  afterEach(jest.resetAllMocks);

  it("shows a message saying you need to type more than one character to do a search", async () => {
    render(<SearchListPatientView sortBy="desc" searchQuery="a" />);

    expect(
      screen.getByText("Please type more than one character to search")
    ).toBeInTheDocument();
  });

  it("displays a loading screen when search initiated (>= 2 characters)", async () => {
    render(<SearchListPatientView sortBy="desc" searchQuery="a" />);

    const input = await screen.findByLabelText(/Search/);

    fireEvent.change(input, { target: { value: "ab" } });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
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

    render(<SearchListPatientView sortBy="asc" searchQuery="test" />);

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

    render(<SearchListPatientView sortBy="asc" searchQuery="test" />);

    expect(await screen.findByText("Uh oh!")).toBeInTheDocument();
  });

  it("toggles sorting the data by ascending or descending depending on prop", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValueOnce(stubPatientData);

    // initial render
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);

    // new props
    (sortDataByName as jest.Mock).mockReturnValueOnce(stubPatientData);

    const { rerender } = render(
      <SearchListPatientView sortBy="asc" searchQuery="test" />
    );

    expect(sortDataByName).toHaveBeenCalledTimes(1);
    expect(sortDataByName).toHaveBeenCalledWith(stubPatientData, "asc");

    rerender(<SearchListPatientView sortBy="desc" searchQuery="test" />);
    expect(sortDataByName).toHaveBeenCalledTimes(2);

    expect(sortDataByName).toHaveBeenNthCalledWith(2, stubPatientData, "desc");
  });
});
