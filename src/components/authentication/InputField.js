import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../stylesheets/AuthForm.module.scss';

const InputField = (props) => {
  const {
    handleChange, errors, type, placeholder, name,
  } = props;
  return (
    <div className={styles.fieldWrapper}>
      {errors && <p>{errors}</p>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

InputField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputField;
