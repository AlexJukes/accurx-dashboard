import { PatientDashboard } from "../PatientDashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Accurx Dashboard</header>
      <main>
        <PatientDashboard />
      </main>
    </div>
  );
}

export { App };