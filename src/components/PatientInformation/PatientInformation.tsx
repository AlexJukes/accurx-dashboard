import React from "react";
import { fetchPatientData, Patient } from "../../api/fetchPatientData";

const PATIENT_DATA_ENDPOINT =
  "https://61ba219448df2f0017e5a929.mockapi.io/api/patients";

const PatientInformation: React.FC = () => {
  const [patientData, setPatientData] = React.useState<Patient[]>([]);

  React.useEffect(() => {
    const getPatientData = async () => {
      const fetchedPatientData = await fetchPatientData(PATIENT_DATA_ENDPOINT);
      console.log("fetchedPatientData", fetchedPatientData);

      setPatientData(fetchedPatientData);
    };
    getPatientData();
  }, []);
  return (
    <>
      <h1>Patient Information</h1>
      <table>
        {patientData.map((patient) => (
          <td key={patient.id}>{patient.firstName}</td>
        ))}
      </table>
    </>
  );
};

export { PatientInformation };
