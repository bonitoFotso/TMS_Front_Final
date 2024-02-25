import PropTypes from 'prop-types';

import { Grid, styled, TextField } from '@mui/material';

// Styled Grid for customization
const CustomGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Customize the margin as needed
}));

const InputTextField = ({ label, name, value, onChange, fullWidth, multiline, rows, placeholder }) => (
    <CustomGrid container item xs={12} >
      <TextField
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
      />
    </CustomGrid>
  );

InputTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
};

export default InputTextField;
