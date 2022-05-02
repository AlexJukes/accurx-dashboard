import React from "react";
import { fetchPatientData, Patient } from "../../api/fetchPatientData";
import { sortDataByName } from "../../logic/sortDataByName";
import { PatientDataTable } from "../PatientDataTable";

const PATIENT_DATA_ENDPOINT =
  "https://61ba219448df2f0017e5a929.mockapi.io/api/patients";

const PatientDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSortByAsc, setIsSortByAsc] = React.useState<boolean>(true);
  const [searchInput, setSearchInput] = React.useState<string>("");

  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  React.useEffect(() => {
    const getPatientData = async () => {
      try {
        const fetchedPatientData = await fetchPatientData(
          PATIENT_DATA_ENDPOINT
        );
        const sortedPatientData = sortDataByName(fetchedPatientData, "asc"); // sort by asc by default
        setPatientData(sortedPatientData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    getPatientData();
  }, []);

  const handleSortByNameClick = () => {
    const toggledSort = !isSortByAsc;

    const sortedPatientData = sortDataByName(
      patientData,
      toggledSort ? "asc" : "desc"
    );

    setPatientData(sortedPatientData);
    setIsSortByAsc(toggledSort);
  };

  const handleInput = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setSearchInput(value);

  return (
    <>
      <h1>Patient Information</h1>
      <h2>Search</h2>
      <input type="text" value={searchInput} onChange={handleInput} />
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Looks like something went wrong loading the data</div>
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
