import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import API_URL from 'src/config';

const TaskSort = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  const sortOptions = ['Catégorie', 'Activité', 'Statut', 'Priorité'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (sortOption === 'Catégorie') {
          response = await axios.get(`${API_URL}/categories`);
        } else if (sortOption === 'Activité') {
          response = await axios.get(`${API_URL}/activites`);
        } 
        // else if (sortOption === 'Statut') {
        //   response = await axios.get(`${API_URL}/statuts`);
        // } else if (sortOption === 'Priorité') {
        //   response = await axios.get(`${API_URL}/priorites`);
        // }

        setFilterOptions(response.data);
        console.log('filterOptions:', 'filterOptions'); // Ajoutez cette ligne
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (sortOption) {
      fetchData();
      setSelectedFilter('');
    }
  }, [ sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setSelectedFilter('');
    console.log('filterOptions:', filterOptions); // Ajoutez cette ligne
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    onSortChange(sortOption, e.target.value);
  };

  return (
    <Grid container spacing={3} justifyContent='center' alignContent='center'>
      <FormControl fullWidth>
        <InputLabel id="sort-by-label">Trier par</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortOption}
          label="Trier par"
          onChange={handleSortChange}
        >
          <MenuItem value="">Sélectionnez un type de tri</MenuItem>
          {sortOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {sortOption && (
        <FormControl fullWidth>
          <InputLabel id="filter-by-label">Filtrer par {sortOption}</InputLabel>
          <Select
            labelId="filter-by-label"
            id="filter-by"
            value={selectedFilter}
            label={`Filtrer par ${sortOption}`}
            onChange={handleFilterChange}
          >
            <MenuItem value="">Sélectionnez une option</MenuItem>
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Grid>
  );
};

TaskSort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

export default TaskSort; 