import { USER } from "../actions/types";

const intitalState = {
  username: "",
  mail: "",
  month: "",
  year: "",
  password: "",
  firstname: "",
  lastname: "",
  method: "",
  recovery: "",
  isvalid: false,
};

const UserReducer = (state = intitalState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default UserReducer;
