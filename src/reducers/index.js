import { combineReducers } from "redux";
import LanguageReducer from "./languageReducer";
import UserReducer from "./userReducer";

export default combineReducers({
  languageReducer: LanguageReducer,
  userReducer: UserReducer,
});
