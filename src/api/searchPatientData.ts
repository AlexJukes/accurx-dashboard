import axios from "axios";
import { PATIENT_DATA_ENDPOINT } from "./constants";
import { Patient } from "./fetchPatientData";

export const searchPatientData = async (
  searchQuery: string
): Promise<Patient[]> => {
  return (
    await axios.get(PATIENT_DATA_ENDPOINT, { params: { search: searchQuery } })
  ).data;
};
