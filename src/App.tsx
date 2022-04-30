import "./App.css";
import { PatientDashboard } from "./components/PatientDashboard";

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

export default App;
