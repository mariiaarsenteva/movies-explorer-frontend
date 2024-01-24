import React, { useState } from 'react';

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    // const form = evt.target.form;

    setValues({
      ...values,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: validationMessage
    });
    setIsInputValid({
      ...isInputValid,
      [name]: valid
    });

    let isFormValid = true;
    Object.keys(isInputValid).forEach((input) => {
      if (!isInputValid[input]) {
        isFormValid = false;
      }
    });
    setIsValid(isFormValid);
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsValid(false);
    setIsInputValid({});
  }

  function setValue(name, value) {
    setValues({
      ...values,
      [name]: value
    });
  }

  return { values, errors, isValid, isInputValid, reset, setValue, handleChange };
}

export default useFormValidation;