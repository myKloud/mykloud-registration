// To make validation

const validate = (
  input,
  value,
  setNameMessage,
  setFirstNameMessage,
  setLastNameMessage,
  setDateOfBirthMessage,
  setMonthMessage,
  firstName,
  lastName,
  setYearMessage,
  formValidation
) => {
  let isValid = true;

  if (input.name === "firstName") {
    setNameMessage("");
    setFirstNameMessage("");

    if (!value.length) {
      setFirstNameMessage(input.required);
      setNameMessage(input.required);

      if (!lastName.length) {
        setLastNameMessage(input.required);
        setNameMessage(formValidation.name.requiredBoth);
      }

      isValid = false;
    } else if (value.length) {
      if (!lastName.length) {
        setLastNameMessage(input.required);
        setNameMessage(formValidation.name.requiredBoth);
        isValid = false;
      }
    }
  }

  if (input.name === "lastName") {
    setNameMessage("");
    setLastNameMessage("");

    if (!value.length) {
      setLastNameMessage(input.required);
      setNameMessage(input.required);

      if (!firstName.length) {
        setFirstNameMessage(input.required);
        setNameMessage(formValidation.name.requiredBoth);
      }

      isValid = false;
    } else if (value.length) {
      if (!firstName.length) {
        setFirstNameMessage(input.required);
        setNameMessage(formValidation.name.requiredBoth);
        isValid = false;
      }
    }
  }

  if (input.name === "month") {
    setDateOfBirthMessage("");
    setMonthMessage("");

    if (!value) {
      setMonthMessage(formValidation.birthDay.required);
      setDateOfBirthMessage(formValidation.birthDay.required);

      isValid = false;
    }
  }

  if (input.name === "year") {
    setDateOfBirthMessage("");
    setYearMessage("");

    if (!value.length) {
      setYearMessage(formValidation.birthDay.required);
      setDateOfBirthMessage(formValidation.birthDay.required);

      isValid = false;
    }
  }

  return isValid;
};

export default validate;
