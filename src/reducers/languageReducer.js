import { LANGUAGE } from "../actions/types";

const intitalState = {
  lang: "en",
};

const LanguageReducer = (state = intitalState, action) => {
  switch (action.type) {
    case LANGUAGE:
      return {
        ...state,
        lang: action.lang,
      };
    default:
      return state;
  }
};

export default LanguageReducer;
