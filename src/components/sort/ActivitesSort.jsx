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
  CircularProgress,
} from '@mui/material';

import API_URL from 'src/config';

const ActivitesSort = ({ setTasks }) => {
  const [activites, setActivites] = useState([]);
  const [selectedActiviteId, setSelectedActiviteId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/activites`);
        setActivites(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des activités :', error);
      } finally {
        setTimeout(() => {
            setLoading(false);
          }, 1500);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTasksByActivite = async () => {
      if (selectedActiviteId !== '') {
        try {
          const response = await axios.get(
            `${API_URL}/taches/by_activite/${selectedActiviteId}`
          );
          setTasks(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des tâches par activité :', error);
        }
      }
    };

    fetchTasksByActivite();
  }, [selectedActiviteId, setTasks]);

  const handleActiviteChange = (event) => {
    setSelectedActiviteId(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h4">
          Activités 
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="activite-select-label">Sélectionnez une Activité</InputLabel>
          <Select
            labelId="activite-select-label"
            id="activite-select"
            value={selectedActiviteId}
            label="Sélectionnez une Activité"
            onChange={handleActiviteChange}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              activites.map((activite) => (
                <MenuItem key={activite.id} value={activite.id}>
                  {activite.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

ActivitesSort.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

export default ActivitesSort;
