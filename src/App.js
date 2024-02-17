import TripList from "./components/TripList";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1 style={{ fontWeight: 400 }}>
          Weather <b>Forecast</b>
        </h1>
      </header>
      <TripList />
    </>
  );
}

export default App;
