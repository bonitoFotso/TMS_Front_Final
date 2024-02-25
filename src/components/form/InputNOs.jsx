import React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// eslint-disable-next-line react/display-name
const TextMaskCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="No:0000000"
      definitions={{
        '#': /\d/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputNOs = ({ label, name, value, onChange, error, required, margin }) => (
  <FormControl fullWidth margin={margin} error={error}>
    <InputLabel htmlFor="formatted-nos-input">{label}</InputLabel>
    <Input
      value={value}
      onChange={onChange}
      name={name}
      id="formatted-nos-input"
      inputComponent={TextMaskCustom}
      required={required}
    />
  </FormControl>
);

InputNOs.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputNOs;
