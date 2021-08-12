import validator from 'validator';

const validateSignUpForm = (formData) => {
  const errors = {};
  let message = '';
  let isFormValid = true;

  if (
    !formData
    || typeof formData.name !== 'string'
    || formData.name.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = 'Please provide a user name.';
  }

  if (
    !formData
    || typeof formData.email !== 'string'
    || !validator.isEmail(formData.email)
  ) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (
    !formData
    || typeof formData.password !== 'string'
    || formData.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!formData || formData.confirm_password !== formData.password) {
    isFormValid = false;
    errors.pwconfirm = "Password confirmation doesn't match.";
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
};

const validateLoginForm = (formData) => {
  const errors = {};
  let message = '';
  let isFormValid = true;

  if (
    !formData
    || typeof formData.email !== 'string'
    || !validator.isEmail(formData.email)
  ) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (
    !formData
    || typeof formData.password !== 'string'
    || formData.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
};
export { validateSignUpForm, validateLoginForm };
