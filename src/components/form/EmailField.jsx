import { useState } from 'react';
import PropTypes from "prop-types"

import TextField from '@mui/material/TextField';

const EmailField = (props) => {
  const { name, label, ...otherProps } = props;
  const [error, setError] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleBlur = (event) => {
    const {value} = event.target;
    setError(!validateEmail(value));
  };

  return (
    <TextField
      {...otherProps}
      name={name}
      label={label}
      onBlur={handleBlur}
      error={error}
      helperText={error ? 'Invalid email address' : ''}
    />
  );
};

EmailField.propTypes = {
  label: PropTypes.any,
  name: PropTypes.any
}

export default EmailField;
