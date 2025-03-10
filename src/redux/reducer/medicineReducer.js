import { MEDICINE_ACTIONS } from "../actionTypes";

const initialMedicineState = {
  medicines: [],
  error: null,
};

export const medicineReducer = (state = initialMedicineState, action) => {
  switch (action.type) {
    case MEDICINE_ACTIONS.ADD_MEDICINE:
      return {
        ...state,
        medicines: [...state.medicines, action.payload],
        error: null,
      };

    case MEDICINE_ACTIONS.DELETE_MEDICINE:
      return {
        ...state,
        medicines: state.medicines.filter(
          (medicine) => medicine.id !== action.payload
        ),
        error: null,
      };

    default:
      return state;
  }
};
