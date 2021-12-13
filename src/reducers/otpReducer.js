import { ONE_TIME_TRANSACTION } from "../actions/types";

const intitalState = {
  otp: "",
};

const OTPReducer = (state = intitalState, action) => {
  switch (action.type) {
    case ONE_TIME_TRANSACTION:
      return {
        ...state,
        otp: action.otp,
      };
    default:
      return state;
  }
};

export default OTPReducer;
