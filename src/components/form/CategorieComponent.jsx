import Axios from 'axios';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import {
  Grid,
  Alert,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';

import API_URL from 'src/config';

import SelectField from 'src/components/form/SelectField';

const CategorieComponent = ({ values, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [newCategorie, setNewCategorie] = useState({ name: '', description: '' });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger toutes les catégories lors du montage du composant
    setLoading(true);
    Axios.get(`${API_URL}/categories/`)
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des catégories', err);
        setError('Une erreur s\'est produite lors du chargement des catégories.');
        setLoading(false);
      });
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewCategorie(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateCategorie = () => {
    setLoading(true);
    setError(null);

    // Envoyer une requête POST pour créer une nouvelle catégorie
    Axios.post(`${API_URL}/categories/`, newCategorie)
      .then(response => {
        setCategories(prevState => [...prevState, response.data]);
        setNewCategorie({ name: '', description: '' });
        setTimeout(() => {
          setDialogOpen(false);
          setLoading(false);
        }, 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la création de la catégorie', err);
        setError('Une erreur s\'est produite lors de la création de la catégorie.');
        setLoading(false);
      });
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setError(null);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}  display="flex" justifyContent="center" alignItems="center">
        <Grid item xs={10}>
          <SelectField
            name="categorie"
            label="Catégories"
            value={values}
            options={categories}
            onChange={onChange}
            multiple
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleOpenDialog} aria-label="Editer">
            <Icon icon="line-md:edit-twotone-full" width="30" />
          </Button>
        </Grid>
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
        <DialogContent>
          {loading && <LinearProgress />} {/* Ajout d'un indicateur de chargement */}
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )} {/* Affichage des erreurs */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="name"
                value={newCategorie.name}
                onChange={handleInputChange}
                placeholder="Nom de la catégorie"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                value={newCategorie.description}
                onChange={handleInputChange}
                placeholder="Description de la catégorie"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleCreateCategorie} variant="contained" color="primary" disabled={loading}>
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

CategorieComponent.propTypes = {
  onChange: PropTypes.any,
  values: PropTypes.any,
};

export default CategorieComponent;
