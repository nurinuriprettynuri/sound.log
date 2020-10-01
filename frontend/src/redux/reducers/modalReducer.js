import merge from "lodash/merge";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modalAction";

const INITIAL_STATE = {
  auth: false,
  confirm: false,
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return merge({}, state, { [action.modal.type]: action.modal.data });
    case CLOSE_MODAL:
      return merge({}, state, { [action.modal.type]: false });
    default:
      return state;
  }
};
