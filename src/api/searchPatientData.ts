import axios from "axios";
import { Patient } from "../types";
import { PATIENT_DATA_ENDPOINT } from "./constants";

export const searchPatientData = async (
  searchQuery: string
): Promise<Patient[]> => {
  return axios
    .get(PATIENT_DATA_ENDPOINT, { params: { search: searchQuery } })
    .then((response) => {
      return response.data;
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        throw new Error("Unable to find any users matching that search");
      }

      throw new Error(
        "Something went wrong. Please refresh the page and try again"
      );
    });
};
