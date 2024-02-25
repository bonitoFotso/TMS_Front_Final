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

const CategoriesSort = ({ setTasks }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTasksByCategory = async () => {
      if (selectedCategoryId !== '') {
        try {
          const response = await axios.get(
            `${API_URL}/taches/by_categorie/${selectedCategoryId}`
          );
          setTasks(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des tâches par catégorie :', error);
        }
      }
    };

    fetchTasksByCategory();
  }, [selectedCategoryId, setTasks]);

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography variant="h4">
          Catégories
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Sélectionnez une Catégorie</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategoryId}
            label="Sélectionnez une Catégorie"
            onChange={handleCategoryChange}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

CategoriesSort.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

export default CategoriesSort;
