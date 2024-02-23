import { app } from "./services/firebase-config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTrip } from "./redux/tripSlice";
import TripList from "./components/TripList";
import "./App.css";
import {
  selectTrips,
  selectSelectedTrip,
  selectIsLoading,
  selectUser,
} from "./redux/selectors";
import Button from "./components/Button";
import AddTrip from "./components/AddTripModal";
import ForecastList from "./components/forecastList";
import SearshInput from "./components/Filter";
import TripDetails from "./components/TripDetail";
import RemoveTrip from "./components/DeleteModal";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";

function App() {
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();
  const selectedTrip = useSelector(selectSelectedTrip);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (trips) {
      dispatch(selectTrip(trips[0]));
    }
  }, []);

  const openModal = () => {
    setShowAddModal(true);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <header>
        <div className="button-container">
          <SignInButton />
          <SignOutButton />
        </div>
        <h1 style={{ fontWeight: 400, marginBottom: "50px" }}>
          Weather <b>Forecast</b>
        </h1>
        <SearshInput />
      </header>
      {!user.id ? (
        <h2>{"You must be logged in to view your trips"}</h2>
      ) : (
        <div className="container main">
          <div
            className="tripList-forecastList-wrapper"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 2,
              height: "100%",
            }}
          >
            <div className="tripList-wrapper">
              <TripList openDeleteModal={openDeleteModal} />
              <Button text="Add trip" icon={"+"} onClick={openModal} />
            </div>
            {selectedTrip && selectedTrip.forecast && <ForecastList />}
          </div>
          <div style={{ minHeight: "100%", flex: 1 }}>
            {selectedTrip && selectedTrip.currentWeather && <TripDetails />}
          </div>
        </div>
      )}

      <RemoveTrip
        showDeleteModal={showDeleteModal}
        closeDeleteModal={closeDeleteModal}
      />
      <AddTrip showAddModal={showAddModal} closeModal={closeModal} />
    </div>
  );
}

export default App;
