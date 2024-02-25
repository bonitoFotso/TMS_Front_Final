// PasswordStrengthMeter.js
import PropTypes from "prop-types"
import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const calculateStrength = (password) => {
const minLength = 8;
  const strength = Math.min((password.length / minLength) * 100, 100);
  return strength;
};

const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    // Mettre à jour la force du mot de passe chaque fois que le mot de passe change
    const passwordStrength = calculateStrength(password);
    setStrength(passwordStrength);
  }, [password]);

  return (
    <div>
      <Typography variant="caption">Strength: {Math.round(strength)}%</Typography>
      <LinearProgress variant="determinate" value={strength} sx={{ my: 1 }} />
    </div>
  );
};

PasswordStrengthMeter.propTypes = {
  password: PropTypes.any
}

export default PasswordStrengthMeter;
