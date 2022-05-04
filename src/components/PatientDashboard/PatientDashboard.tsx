import React from "react";
import { Patient } from "../../api/fetchPatientData";
import { sortDataByName } from "../../logic/sortDataByName";
import { FullListPatientView } from "../FullListPatientView";
import { SearchListPatientView } from "../SearchListPatientView";

const PatientDashboard: React.FC = () => {
  const [isSortByAsc, setIsSortByAsc] = React.useState<boolean>(true);
  const [searchInput, setSearchInput] = React.useState<string>("");

  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  const toggledSort = !isSortByAsc;

  const handleSortByNameClick = () => {
    const sortedPatientData = sortDataByName(
      patientData,
      toggledSort ? "asc" : "desc"
    );

    setPatientData(sortedPatientData);
    setIsSortByAsc(toggledSort);
  };

  const handleInput = async ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(value);
  };

  const sortBy = isSortByAsc ? "asc" : "desc";

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
      <button onClick={handleSortByNameClick}>
        Sort by name {isSortByAsc ? "⬆️" : "⬇️"}
      </button>
      {Boolean(searchInput) ? (
        <SearchListPatientView sortBy={sortBy} searchQuery={searchInput} />
      ) : (
        <FullListPatientView sortBy={sortBy} />
      )}
    </>
  );
};

export { PatientDashboard };
