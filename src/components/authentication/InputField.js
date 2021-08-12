import React from 'react';
import styles from '../../stylesheets/AuthForm.module.scss'
const InputField = (props) => {
  const {
    handleChange, errors, type, placeholder, name
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

export default InputField;
