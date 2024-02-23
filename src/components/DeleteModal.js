import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { removeTrip } from "../redux/tripSlice";
import { fetchCitySuggestions } from "../redux/operations";
import { selectSelectedTrip } from "../redux/selectors";
import { ModalBackdrop } from "./ModalBackdrop";
import { generateDateRange, isValidDate } from "../utils/dateUtils";

const RemoveTrip = ({ showDeleteModal, closeDeleteModal }) => {
  const dispatch = useDispatch();
  const selectedTrip = useSelector(selectSelectedTrip);

  return (
    showDeleteModal && (
      <ModalBackdrop onClose={closeDeleteModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={closeDeleteModal}>
            ×
          </button>
          <h2 className="modal-title">Remove trip</h2>
          <hr className="modal-divider" />
          <p>{`Are you sure you want to delete the trip to ${selectedTrip.city}`}</p>
          <div className="button-container">
            <button
              className="button button-modal"
              type="submit"
              onClick={() => {
                dispatch(removeTrip(selectedTrip.id));
                closeDeleteModal();
              }}
            >
              Remove
            </button>
            <button className="button button-modal" onClick={closeDeleteModal}>
              Cancel
            </button>
          </div>
        </div>
      </ModalBackdrop>
    )
  );
};

export default RemoveTrip;
