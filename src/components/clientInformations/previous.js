// used for return to previous page
const previous = (setStorage, history, location) => {
  setStorage("register");
  history.push({
    pathname: "/register",
    state: {
      backUser: location.state.user,
      backPassword: location.state.password,
    },
  });
};

export default previous;
