// To check Date of birth

const dobValidation = (year, month, formValidation) => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const hour = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const milliSeconds = currentDate.getMilliseconds();

  const dob_date = new Date(
    year,
    month - 1,
    date,
    hour,
    minutes,
    seconds,
    milliSeconds
  );

  const diff = currentDate.getTime() - dob_date.getTime();
  const age = diff / (1000 * 60 * 60 * 24 * 365.25);

  let isValid = true;
  if (age <= formValidation.birthDay.minimum) {
    isValid = false;
  }

  return isValid;
};

export default dobValidation;
