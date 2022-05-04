type Vaccine = "Pfizer" | "AstraZeneca";

interface Patient {
  firstName: string;
  lastName: string;
  vaccineDate: number;
  vaccineType: Vaccine;
  nhsNumber: string;
  id: string;
}

export type { Vaccine, Patient };
