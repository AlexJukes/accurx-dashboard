import React from "react";
import { fetchPatientData, Patient } from "../../api/fetchPatientData";
import { searchPatientData } from "../../api/searchPatientData";
import { sortDataByName } from "../../logic/sortDataByName";
import { PatientDataTable } from "../PatientDataTable";

const DEFAULT_SORT_BY = "asc";

const PatientDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSortByAsc, setIsSortByAsc] = React.useState<boolean>(true);
  const [searchInput, setSearchInput] = React.useState<string>("");

  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  React.useEffect(() => {
    const getPatientData = async () => {
      try {
        const fetchedPatientData = await fetchPatientData();
        const sortedPatientData = sortDataByName(
          fetchedPatientData,
          DEFAULT_SORT_BY
        );
        setPatientData(sortedPatientData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    getPatientData();
  }, []);

  const toggledSort = !isSortByAsc;

  const handleSortByNameClick = () => {
    const sortedPatientData = sortDataByName(
      patientData,
      toggledSort ? "asc" : "desc"
    );

    setPatientData(sortedPatientData);
    setIsSortByAsc(toggledSort);
  };

  const isSearching = searchInput.length === 1;
  const invalidSearchValue = isSearching || !Boolean(searchInput);

  const handleInput = async ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
    try {
      setSearchInput(value);
      if (invalidSearchValue) return;
      setIsLoading(true);
      console.log("value", value);

      const searchedPatientData = await searchPatientData(value);
      const sortedPatientData = sortDataByName(
        searchedPatientData,
        toggledSort ? "asc" : "desc"
      );
      setPatientData(sortedPatientData);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Patient Information</h1>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        value={searchInput}
        onChange={handleInput}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Looks like something went wrong loading the data</div>
      ) : isSearching ? (
        <div>Please type more than one character to search</div>
      ) : (
        <>
          <button onClick={handleSortByNameClick}>
            Sort by name {isSortByAsc ? "⬆️" : "⬇️"}
          </button>
          <PatientDataTable patientData={patientData} />
        </>
      )}
    </>
  );
};

export { PatientDashboard };
