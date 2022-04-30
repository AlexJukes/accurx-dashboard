import { Patient } from "../../api/fetchPatientData";

interface PatientDataTableProps {
  patients: Patient[];
}

const PatientDataTable: React.FC<PatientDataTableProps> = ({ patients }) => {
  return (
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
        {patients.length
          ? patients.map(
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
  );
};

export { PatientDataTable };
