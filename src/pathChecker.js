const pathChecker = (userObj, history, storage, removeStorage, location) => {
  const pathname = window.location.pathname;
  const is_valid_pathname =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/forgetUser" ||
    pathname === "/forgetPass";

  if (storage && storage === "dob") {
    return history.push({
      pathname: `${storage}`,
    });
  }

  if (storage && storage === "welcome") {
    if (location.pathname === "/verification") {
      window.location.pathname = "/register";
      removeStorage();
      return;
    }
    if (location.pathname === "/register") {
      window.location.pathname = "/register";
      removeStorage();
      return;
    }
    if (location.pathname === "/login") {
      window.location.pathname = "/login";
      removeStorage();
      return;
    }

    return history.push({
      pathname: `${storage}`,
    });
  }

  if (!userObj.isvalid || is_valid_pathname) {
    removeStorage();
  }
  if (is_valid_pathname) return;

  if (!storage || !userObj.isvalid) {
    history.push({
      pathname: "/register",
    });
  } else {
    history.push({
      pathname: `${storage}`,
    });
  }
};

export default pathChecker;
