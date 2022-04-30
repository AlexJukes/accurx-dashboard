import { screen, render } from "@testing-library/react";
import { PatientInformation } from "..";

describe("PatientInformation", () => {
  it("renders", () => {
    render(<PatientInformation />);
    expect(screen.getByText("Patient Information")).toBeInTheDocument();
  });
});
