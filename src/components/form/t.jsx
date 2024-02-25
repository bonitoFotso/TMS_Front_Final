import { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, FormControl } from '@mui/material';

// eslint-disable-next-line no-unused-vars
const InputNOs = ({ label, names, values, onChange, error, helperText, required, margin, errorStyle }) => {
    const [val, setVal] = useState({
        n_os: '',
    })
     // const sanitizeAndFormatNOs = (inputValue) => {
     //     // Supprimer tous les caractères non numériques
     //     const sanitizedValue = inputValue.replace(/\D/g, '');
     //     console.log(sanitizedValue,'ss');
     //     // Limiter la longueur à 8 chiffres
     //     const limitedValue = sanitizedValue.slice(0, 8);
     //     console.log(limitedValue,'ll');
     //     // Ajouter "No:" au début
     // 
     //     return limitedValue;
     //   };
    // const regex = /^\d{8}$/;

    const handleChange = (event) => {
        const {  name, value} = event.target;
        console.log(value,'init0');
        setVal((prevData) => ({ ...prevData, [name]: value  }));
        console.log(value,'init');
        console.log(val,'val');
        // setVal(sanitizeAndFormatNOs(value));
        // console.log(val,'final');
        // if (regex.test(value)) {
        //     onChange(event);
        //     console.log(val,'ff');
        // }
      };

  return (
    <FormControl fullWidth style={{ margin }}>
      <TextField
        variant="standard"
        label={label}
        id={names}
        name={names}
        value={val.value}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error && helperText}
        required={required}
        style={error && errorStyle}
        // inputProps={{ inputMode: 'numeric' }}
      />
    </FormControl>
  );
};

InputNOs.propTypes = {
  error: PropTypes.func,
  helperText: PropTypes.any,
  label: PropTypes.any,
  names: PropTypes.any,
  onChange: PropTypes.any,
  values: PropTypes.any,
  required: PropTypes.bool,
  margin: PropTypes.string,
  errorStyle: PropTypes.object,
};

export default InputNOs;
