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

const StatusSort = ({ setTasks }) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const  statuses = [
    ['En attente', 'En attente'],
    ['En cours', 'En cours'],
    ['En arrêt', 'En arrêt'],
    ['Effectué', 'Effectué'],
];


  useEffect(() => {
    const fetchTasksByStatus = async () => {
      if (selectedStatus !== '') {
        try {
          // Remplacez l'URL avec le chemin correct pour récupérer les tâches par statut depuis votre API Django
          const response = await axios.get(`${API_URL}/taches/by_status/${selectedStatus}`);
          setTasks(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des tâches par statut :', error);
        }
      }
    };

    fetchTasksByStatus();
  }, [selectedStatus, setTasks]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h4">
          Statuts
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Sélectionnez un Statut</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            label="Sélectionnez un Statut"
            onChange={handleStatusChange}
          >
            {
              statuses.map((status) => (
                <MenuItem key={status[0]} value={status[0]}>
                  {status[1]}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

StatusSort.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

export default StatusSort;
