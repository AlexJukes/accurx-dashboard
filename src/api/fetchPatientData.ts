import axios from "axios";
import { Patient } from "../types";
import { PATIENT_DATA_ENDPOINT } from "./constants";

const fetchPatientData = async (): Promise<Patient[]> => {
  return (await axios.get(PATIENT_DATA_ENDPOINT)).data;
};

export { fetchPatientData };
