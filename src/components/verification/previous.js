import { setStorage } from "../../shared/storage";

const previous = (props, history, userObj, min, seconds) => {
  if (props.setStage) {
    props.setStage("recovery");
  } else {
    setStorage("recovery");
    userObj.min = 0;
    userObj.seconds = 0;
    history.push({
      pathname: "/recovery",
      state: {
        min: min,
        seconds: seconds,
      },
    });
  }
};

export default previous;
