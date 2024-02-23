import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTrip } from "../redux/tripSlice";
import { fetchCitySuggestions } from "../redux/operations";
import { ModalBackdrop } from "./ModalBackdrop";
import { generateDateRange, isValidDate } from "../utils/dateUtils";

const AddTrip = ({ showAddModal, closeModal }) => {
  const dispatch = useDispatch();

  const [newTrip, setNewTrip] = useState({
    city: "",
    startDate: "",
    endDate: "",
  });

  const [citySuggestions, setCitySuggestions] = useState([]);

  useEffect(() => {
    if (newTrip.city.length > 2) {
      dispatch(fetchCitySuggestions(newTrip.city)).then((response) => {
        setCitySuggestions(response.payload.data);
      });
    }
  }, [newTrip.city, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleAdd = (evt) => {
    evt.preventDefault();
    const isCityValid = citySuggestions.some(
      (suggestion) => suggestion.name === newTrip.city
    );
    if (!isCityValid) {
      alert("Please select a city from the suggestions list.");
      return;
    }
    if (!isValidDate(newTrip.startDate) || !isValidDate(newTrip.endDate)) {
      alert(
        "Please ensure the start date and the end date are in the format MM/DD/YYYY."
      );
      return;
    }

    dispatch(addTrip({ ...newTrip, id: uuidv4() }));
    closeModal();
  };

  return (
    showAddModal && (
      <ModalBackdrop onClose={closeModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={closeModal}>
            ×
          </button>
          <h2 className="modal-title">Create trip</h2>
          <hr className="modal-divider" />
          <form className="modal-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">
                  <span style={{ color: "red" }}>*</span> City
                </span>
                <input
                  placeholder="Please select a city"
                  className="form-input"
                  type="text"
                  name="city"
                  value={newTrip.city}
                  onChange={handleInputChange}
                  list="city-suggestions"
                />
                <datalist id="city-suggestions">
                  {citySuggestions.map((suggestion) => (
                    <option key={suggestion.id} value={suggestion.name} />
                  ))}
                </datalist>
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">
                  <span style={{ color: "red" }}>*</span> Start date
                </span>

                <input
                  className="form-input"
                  type="date"
                  name="startDate"
                  min={generateDateRange().minDate}
                  max={generateDateRange().maxDate}
                  value={newTrip.startDate}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">
                  <span style={{ color: "red" }}>*</span> End date
                </span>

                <input
                  className="form-input"
                  type="date"
                  name="endDate"
                  min={generateDateRange().minDate}
                  max={generateDateRange().maxDate}
                  value={newTrip.endDate}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="button-container">
              <button
                className="button button-modal"
                type="submit"
                onClick={handleAdd}
              >
                Save
              </button>
              <button className="button button-modal" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </ModalBackdrop>
    )
  );
};

export default AddTrip;
