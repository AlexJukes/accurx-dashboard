import React, { useEffect } from "react";
import { fetchPatientData, Patient } from "../../api/fetchPatientData";
import { searchPatientData } from "../../api/searchPatientData";
import { sortDataByName } from "../../logic/sortDataByName";
import { PatientDataTable } from "../PatientDataTable";

const DEFAULT_SORT_BY = "asc";

const PatientDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [isSortByAsc, setIsSortByAsc] = React.useState<boolean>(true);
  const [searchInput, setSearchInput] = React.useState<string>("");

  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const fetchedPatientData = await fetchPatientData();
        const sortedPatientData = sortDataByName(
          fetchedPatientData,
          DEFAULT_SORT_BY
        );
        setPatientData(sortedPatientData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
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

  const handleInput = async ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(value);
  };

  useEffect(() => {
    const searchUsers = async () => {
      try {
        setError(null);

        if (searchInput.length < 2) return;
        setIsLoading(true);
        const searchedPatientData = await searchPatientData(searchInput);
        const sortedPatientData = sortDataByName(
          searchedPatientData,
          toggledSort ? "asc" : "desc"
        );
        setPatientData(sortedPatientData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    searchUsers();
  }, [searchInput, toggledSort]);

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
      ) : error ? (
        <div>{error.message}</div>
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
