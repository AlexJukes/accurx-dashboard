import React from "react";
import { fetchPatientData, Patient } from "../../api/fetchPatientData";
import { PatientDataTable } from "../PatientDataTable";

const PATIENT_DATA_ENDPOINT =
  "https://61ba219448df2f0017e5a929.mockapi.io/api/patients";

const PatientDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  React.useEffect(() => {
    const getPatientData = async () => {
      try {
        const fetchedPatientData = await fetchPatientData(
          PATIENT_DATA_ENDPOINT
        );
        setPatientData(fetchedPatientData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    getPatientData();
  }, []);

  return (
    <>
      <h1>Patient Information</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Looks like something went wrong loading the data</div>
      ) : (
        <PatientDataTable patientData={patientData} />
      )}
    </>
  );
};

export { PatientDashboard };
