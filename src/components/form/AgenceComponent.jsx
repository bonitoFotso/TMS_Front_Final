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

import ClientComponent from './ClientComponent';


const AgenceComponent = ({ values, onChange }) => {
  const [agences, setAgences] = useState([]);
  const [newAgence, setNewAgence] = useState({
    name: '',
    responsable: '',
    address: '',
    city: '',
    siege: '', // Supposant que siege est une référence à une autre table
    phone: '',
    email: '',
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger toutes les agences lors du montage du composant
    setLoading(true);
    Axios.get(`${API_URL}/agences/`)  // Ajustez l'URL de l'API selon vos besoins
      .then(response => {
        setAgences(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des agences', err);
        setError("Une erreur s'est produite lors du chargement des agences.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewAgence(prevState => ({ ...prevState, [name]: value }));
    console.log('dd',name,value);
  };

  const handleCreateAgence = () => {
    setLoading(true);
    setError(null);

    // Envoyer une requête POST pour créer une nouvelle agence
    Axios.post(`${API_URL}/agences/`, newAgence)  // Ajustez l'URL de l'API selon vos besoins
      .then(response => {
        setAgences(prevState => [...prevState, response.data]);
        setNewAgence({
          name: '',
          responsable: '',
          address: '',
          city: '',
          siege: '',
          phone: '',
          email: '',
        });
        setTimeout(() => {
          setDialogOpen(false);
          setLoading(false);
        }, 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la création de l\'agence', err);
        setError("Une erreur s'est produite lors de la création de l'agence.");
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
      <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <Grid item xs={10}>
          <SelectField
            name="agence"
            label="Agences"
            value={values}
            options={agences}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleOpenDialog} aria-label="Editer">
            <Icon icon="line-md:edit-twotone-full" width="30" />
          </Button>
        </Grid>
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Créer une nouvelle agence</DialogTitle>
        <DialogContent>
          {loading && <LinearProgress />} {/* Ajout d'un indicateur de chargement */}
          {error && <Alert severity="error">{error}</Alert>} {/* Affichage des erreurs */}
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <ClientComponent
                values={newAgence.siege}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="name"
                value={newAgence.name}
                onChange={handleInputChange}
                placeholder="Nom de l'agence"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="responsable"
                value={newAgence.responsable}
                onChange={handleInputChange}
                placeholder="Responsable"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="address"
                value={newAgence.address}
                onChange={handleInputChange}
                placeholder="Adresse"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="city"
                value={newAgence.city}
                onChange={handleInputChange}
                placeholder="Ville"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="phone"
                value={newAgence.phone}
                onChange={handleInputChange}
                placeholder="Téléphone"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                name="email"
                value={newAgence.email}
                onChange={handleInputChange}
                placeholder="Email"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleCreateAgence} variant="contained" color="primary" disabled={loading}>
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

AgenceComponent.propTypes = {
  onChange: PropTypes.any,
  values: PropTypes.any,
};

export default AgenceComponent;
