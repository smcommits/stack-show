import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../stylesheets/AuthForm.module.scss';

const InputField = (props) => {
  const {
    handleChange, errors, type, placeholder, name, iconPath,
  } = props;
  return (
    <div className={styles.fieldWrapper}>
      {errors && <p className={styles.errors}>{errors}</p>}
      <div className={styles.inputWrapper}>
        {iconPath && <img src={iconPath} alt="icon" />}
        <input
          type={type}
          onChange={handleChange}
          name={name}
        />
        <p className={styles.placeholder}>{placeholder}</p>
      </div>
    </div>
  );
};

InputField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  iconPath: PropTypes.string,
};

InputField.defaultProps = {
  errors: '',
  iconPath: '',
};

export default InputField;
