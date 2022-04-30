import axios from "axios";

type Vaccine = "Pfizer" | "AstraZeneca";

interface Patient {
  firstName: string;
  lastName: string;
  vaccineDate: number;
  vaccineType: Vaccine;
  nhsNumber: string;
  id: string;
}

const fetchPatientData = async (url: string): Promise<Patient[]> => {
  return (await axios.get(url)).data;
};

export { fetchPatientData };
export type { Patient, Vaccine };
