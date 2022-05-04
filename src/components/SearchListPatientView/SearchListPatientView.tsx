import React, { useEffect } from "react";
import { Patient } from "../../api/fetchPatientData";
import { searchPatientData } from "../../api/searchPatientData";
import { sortDataByName } from "../../logic/sortDataByName";
import { PatientDataTable } from "../PatientDataTable";

interface SearchListPatientViewProps {
  sortBy: "asc" | "desc";
  searchQuery: string;
}

const SearchListPatientView: React.FC<SearchListPatientViewProps> = ({
  sortBy,
  searchQuery,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  const isSearching = searchQuery.length === 1;

  useEffect(() => {
    const searchUsers = async () => {
      try {
        setError(null);
        setIsLoading(false);
        if (searchQuery.length < 2) return;
        setIsLoading(true);
        const searchedPatientData = await searchPatientData(searchQuery);
        const sortedPatientData = sortDataByName(searchedPatientData, sortBy);
        setPatientData(sortedPatientData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    searchUsers();
  }, [searchQuery, sortBy]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : isSearching ? (
        <div>Please type more than one character to search</div>
      ) : (
        <>
          <PatientDataTable patientData={patientData} />
        </>
      )}
    </>
  );
};

export { SearchListPatientView };
