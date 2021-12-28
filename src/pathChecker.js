const pathChecker = (userObj, history, storage, removeStorage, location) => {
  const pathname = window.location.pathname;
  const isValidPathname =
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

  if (!userObj.isValid || isValidPathname) {
    removeStorage();
  }
  if (isValidPathname) return;

  if (!storage || !userObj.isValid) {
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
