const nextPage = (
  validateHandler,
  dobValidation,
  userObj,
  setUserObj,
  setStorage,
  history,
  firstName,
  lastName,
  month,
  year,
  formValidation
) => {
  const isValid = validateHandler();

  if (isValid) {
    const isValidDob = dobValidation(year, month, formValidation);

    if (isValidDob) {
      userObj.firstname = firstName;
      userObj.lastname = lastName;
      userObj.month = month;
      userObj.year = year;

      setUserObj(userObj);
      setStorage("recovery");

      history.push({
        pathname: "/recovery",
      });
    } else {
      setStorage("dob");
      history.push({
        pathname: "/dob",
      });
    }
  }
};

export default nextPage;
