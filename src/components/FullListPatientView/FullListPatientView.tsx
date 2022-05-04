import React, { useEffect } from "react";
import { fetchPatientData, Patient } from "../../api/fetchPatientData";
import { sortDataByName } from "../../logic/sortDataByName";
import { PatientDataTable } from "../PatientDataTable";

interface FullListPatientViewProps {
  sortBy: "asc" | "desc";
}

const FullListPatientView: React.FC<FullListPatientViewProps> = ({
  sortBy,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const fetchedPatientData = await fetchPatientData();
        const sortedPatientData = sortDataByName(fetchedPatientData, sortBy);
        setPatientData(sortedPatientData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };
    getPatientData();
  }, [sortBy]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <>
          <PatientDataTable patientData={patientData} />
        </>
      )}
    </>
  );
};

export { FullListPatientView };
