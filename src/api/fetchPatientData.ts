import axios from "axios";
import { PATIENT_DATA_ENDPOINT } from "./constants";

type Vaccine = "Pfizer" | "AstraZeneca";

interface Patient {
  firstName: string;
  lastName: string;
  vaccineDate: number;
  vaccineType: Vaccine;
  nhsNumber: string;
  id: string;
}

const fetchPatientData = async (): Promise<Patient[]> => {
  return (await axios.get(PATIENT_DATA_ENDPOINT)).data;
};

export { fetchPatientData };
export type { Patient, Vaccine };
