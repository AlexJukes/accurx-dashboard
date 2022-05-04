import { Patient } from "../types";

const sortDataByName = (data: Patient[], sortBy: "asc" | "desc"): Patient[] => {
  return data
    .map((data) => data)
    .sort((a, b) => {
      if (sortBy === "asc") {
        return a.lastName.localeCompare(b.lastName);
      } else {
        return b.lastName.localeCompare(a.lastName);
      }
    });
};

export { sortDataByName };
