import { Patient } from "../../../../types";
import "./PatientDataTable.css";

interface PatientDataTableProps {
  patientData: Patient[];
}

const PatientDataTable: React.FC<PatientDataTableProps> = ({ patientData }) => {
  return (
    <div className="patient-data-table">
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>NHS Number</th>
            <th>Type of Vaccine</th>
          </tr>
        </thead>
        <tbody>
          {patientData.length
            ? patientData.map(
                ({ id, firstName, lastName, vaccineType, nhsNumber }) => (
                  <tr key={id}>
                    <td>{lastName}</td>
                    <td>{firstName}</td>
                    <td>{nhsNumber}</td>
                    <td>{vaccineType}</td>
                  </tr>
                )
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};

export { PatientDataTable };
