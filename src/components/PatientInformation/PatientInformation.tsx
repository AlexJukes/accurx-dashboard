import React from "react";
import { fetchPatientData, Patient } from "../../api/fetchPatientData";
import { PatientDataTable } from "../PatientDataTable";

const PATIENT_DATA_ENDPOINT =
  "https://61ba219448df2f0017e5a929.mockapi.io/api/patients";

const PatientInformation: React.FC = () => {
  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  React.useEffect(() => {
    const getPatientData = async () => {
      const fetchedPatientData = await fetchPatientData(PATIENT_DATA_ENDPOINT);
      setPatientData(fetchedPatientData);
    };
    getPatientData();
  }, []);
  return (
    <>
      <h1>Patient Information</h1>
      <PatientDataTable patients={patientData} />
    </>
  );
};

export { PatientInformation };
