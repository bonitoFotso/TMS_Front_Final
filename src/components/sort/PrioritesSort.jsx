import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material';

import API_URL from 'src/config';

const PrioritesSort = ({ setTasks }) => {
  const [selectedPriorite, setSelectedPriorite] = useState('');

  const priorites = [
    ['Bas', 'Bas'],
    ['Moyen', 'Moyen'],
    ['Élevé', 'Élevé'],
]

  useEffect(() => {
    const fetchTasksByPriorite = async () => {
      if (selectedPriorite !== '') {
        try {
          // Remplacez l'URL avec le chemin correct pour récupérer les tâches par priorité depuis votre API Django
          const response = await axios.get(`${API_URL}/taches/by_priorite/${selectedPriorite}`);
          setTasks(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des tâches par priorité :', error);
        }
      }
    };

    fetchTasksByPriorite();
  }, [selectedPriorite, setTasks]);

  const handlePrioriteChange = (event) => {
    setSelectedPriorite(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h4">
          Priorités
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="priorite-select-label">Sélectionnez une Priorité</InputLabel>
          <Select
            labelId="priorite-select-label"
            id="priorite-select"
            value={selectedPriorite}
            label="Sélectionnez une Priorité"
            onChange={handlePrioriteChange}
          >
            {
              priorites.map((priorite) => (
                <MenuItem key={priorite[0]} value={priorite[0]}>
                  {priorite[1]}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

PrioritesSort.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

export default PrioritesSort;
