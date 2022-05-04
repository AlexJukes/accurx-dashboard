import React from "react";
import "./PatientDashboard.css";
import { sortDataByName } from "../../logic/sortDataByName";
import { Patient } from "../../types";
import { FullListPatientView } from "./components/FullListPatientView";
import { SearchListPatientView } from "./components/SearchListPatientView";

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
      <div className="search-bar">
        <label htmlFor="search">Search by last name </label>
        <input
          type="text"
          id="search"
          value={searchInput}
          onChange={handleInput}
        />
      </div>
      <div className="toggle-button">
        <button onClick={handleSortByNameClick}>
          Sort by name {isSortByAsc ? "A-Z" : "Z-A"} {isSortByAsc ? "⬆️" : "⬇️"}
        </button>
      </div>
      {Boolean(searchInput) ? (
        <SearchListPatientView sortBy={sortBy} searchQuery={searchInput} />
      ) : (
        <FullListPatientView sortBy={sortBy} />
      )}
    </>
  );
};

export { PatientDashboard };
