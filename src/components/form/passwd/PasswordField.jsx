/* eslint-disable no-unused-vars */
// PasswordField.js
import PropTypes from "prop-types"
import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// import PasswordStrengthMeter from './PasswordStrengthMeter';

const PasswordField = ({ value, onChange, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  

  const calculateStrength = (password) => {
    const minLength = 4;
      const strength = Math.min((password.length / minLength) * 100, 100);
      return strength;
    };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    console.log( calculateStrength(newPassword));

    // Ajouter la logique de validation du mot de passe
    const passwordValidationResult = validatePassword(newPassword);
    setPasswordError(passwordValidationResult);

    onChange(event);
  };

  const validatePassword = (password) => {
    // Exemple simple : Longueur minimale de 8 caractères
    if (password.length < 4) {
      return 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    
    return ''; // Aucune erreur
  };

  return (
      <TextField
        name="password"
        label="Password"
        value={value}
        type={showPassword ? 'text' : 'password'}
        onChange={handlePasswordChange}
        error={!!passwordError}
        helperText={passwordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />

      
  );
};

PasswordField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any
}
export default PasswordField;
