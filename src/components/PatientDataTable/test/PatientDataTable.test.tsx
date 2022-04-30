import { render, screen } from "@testing-library/react";
import { PatientDataTable } from "..";
import { Vaccine } from "../../../api/fetchPatientData";

describe("PatientDataTable", () => {
  it("renders given patient data correctly", () => {
    const mockPatientData = [
      {
        firstName: "Gelato",
        lastName: "Al Cioccolato",
        vaccineDate: 1637877061,
        vaccineType: "Pfizer" as Vaccine,
        nhsNumber: "4584318425",
        id: "1",
      },
    ];

    render(<PatientDataTable patients={mockPatientData} />);
    screen.getByText("Gelato");
    screen.getByText("Al Cioccolato");
    screen.getByText("Pfizer");
    screen.getByText("4584318425");
  });
});
