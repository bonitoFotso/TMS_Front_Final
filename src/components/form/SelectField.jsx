import PropTypes from 'prop-types';

import { Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const SelectField = ({
   label,
   name,
   value,
   onChange,
   options,
   error,
   multiple,
   defaultOptionLabel = 'Sélectionnez ....',
   optionsType = 'default' // Ajout de la nouvelle prop optionsType avec une valeur par défaut
}) => {
   let labelKey; let valueKey;

   // Déterminez les clés appropriées en fonction du type d'options
   if (optionsType === 'status' || optionsType === 'priority') {
      labelKey = 'label';
      valueKey = 'value';
   } else {
      labelKey = 'name';
      valueKey = 'id';
   }

   return (
      <Grid container spacing={2}>
         <Grid item xs={12} paddingBottom={2}>
            <FormControl fullWidth>
               <InputLabel id={`${name}-label`}>{label}</InputLabel>
               <Select
                  labelId={`${name}-label`}
                  id={name}
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error && Boolean(error)}
                  multiple={multiple}
                  variant="outlined"
               >
                  {defaultOptionLabel && (
                     <MenuItem value="" disabled>
                        {defaultOptionLabel}
                     </MenuItem>
                  )}
                  {options.map((option) => (
                     <MenuItem key={option[valueKey]} value={option[valueKey]}>
                        {option[labelKey]}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Grid>
      </Grid>
   );
};

SelectField.propTypes = {
   error: PropTypes.func,
   label: PropTypes.any,
   multiple: PropTypes.bool,
   name: PropTypes.any,
   onChange: PropTypes.any,
   options: PropTypes.arrayOf(
      PropTypes.oneOfType([
         PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
         }),
         PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
         })
      ])
   ),
   value: PropTypes.any,
   defaultOptionLabel: PropTypes.string,
   optionsType: PropTypes.string // Nouvelle prop pour spécifier le type d'options
};

export default SelectField;
