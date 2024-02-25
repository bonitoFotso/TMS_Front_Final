import PropTypes from 'prop-types';

import { TextField, FormControl } from '@mui/material';

// eslint-disable-next-line no-unused-vars
const DateTimeField = ({ label, name, value, onChange, error, helperText, required, margin, errorStyle }) => {
  // Assurez-vous que la valeur est une chaîne vide si elle est nulle
  const sanitizedValue = value || '';

  return (
    <FormControl fullWidth style={{ margin }}>
      <TextField
        variant="outlined"
        label={label}
        id={name}
        name={name}
        type="datetime-local"
        value={sanitizedValue}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error && helperText}
        required={required}
        style={{ marginTop: '10px' }}  // Ajout de la propriété marginTop pour déplacer le label vers le haut
        InputLabelProps={{ shrink: true }} // Réduire le label pour qu'il ne soit pas au milieu
        InputProps={{ style: { fontSize: 14 } }} // Ajuster la taille de la police du label
      />
    </FormControl>
  );
};

DateTimeField.propTypes = {
  error: PropTypes.func,
  helperText: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
  required: PropTypes.bool,
  margin: PropTypes.string,
  errorStyle: PropTypes.object,
};

export default DateTimeField;
