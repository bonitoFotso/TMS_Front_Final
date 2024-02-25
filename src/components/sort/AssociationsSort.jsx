// Importations nécessaires
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

// Composant AssociationsSort
const AssociationsSort = ({ setTasks }) => {
  // États locaux
  const [associations, setAssociations] = useState([]);
  const [selectedAssociationId, setSelectedAssociationId] = useState('');
  const [loading, setLoading] = useState(true);

  // Effet pour charger les associations au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/techniciens`);
        setAssociations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des associations :', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchData();
  }, []);

  // Effet pour récupérer les tâches par association lorsqu'une association est sélectionnée
  useEffect(() => {
    const fetchTasksByAssociation = async () => {
      if (selectedAssociationId !== '') {
        try {
          const response = await axios.get(
            `${API_URL}/taches/by_association/${selectedAssociationId}`
          );
          setTasks(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des tâches par association :', error);
        }
      }
    };

    fetchTasksByAssociation();
  }, [selectedAssociationId, setTasks]);

  // Gestionnaire de changement d'association
  const handleAssociationChange = (event) => {
    setSelectedAssociationId(event.target.value);
  };

  // Rendu du composant
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h4">
          Associations
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="association-select-label">Sélectionnez une Association</InputLabel>
          <Select
            labelId="association-select-label"
            id="association-select"
            value={selectedAssociationId}
            label="Sélectionnez une Association"
            onChange={handleAssociationChange}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              associations.map((association) => (
                <MenuItem key={association.id} value={association.id}>
                  {association.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

// Propriétés attendues
AssociationsSort.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

// Exportation du composant
export default AssociationsSort;
