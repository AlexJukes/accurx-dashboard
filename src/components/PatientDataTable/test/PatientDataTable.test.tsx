import { render, screen } from "@testing-library/react";
import { PatientDataTable } from "..";
import { stubPatientData } from "../../../test/stubs/patientData.stub";

describe("PatientDataTable", () => {
  it("renders given patient data correctly", () => {
    render(<PatientDataTable patientData={stubPatientData} />);
    screen.getByText("Panettone");
    screen.getByText("Di pere");
    screen.getByText("Bucatino");
    screen.getByText("de Bucatis");
    screen.getByText("Gnocco");
    screen.getByText("Gnocchini");
    screen.getByText("6206597660");
    screen.getByText("4798775436");
    screen.getByText("7723376707");
    expect(screen.getAllByText("Pfizer").length).toEqual(1);
    expect(screen.getAllByText("AstraZeneca").length).toEqual(2);
  });
});
