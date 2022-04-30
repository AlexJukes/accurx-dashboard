import "./App.css";
import { PatientInformation } from "./components/PatientInformation";

function App() {
  return (
    <div className="App">
      <header className="App-header">Accurx Dashboard</header>
      <main>
        <PatientInformation />
      </main>
    </div>
  );
}

export default App;
