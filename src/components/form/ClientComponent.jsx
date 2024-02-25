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

const ClientComponent = ({ values, onChange }) => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    responsable: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger tous les clients lors du montage du composant
    setLoading(true);
    Axios.get(`${API_URL}/clients/`)
      .then(response => {
        setClients(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des clients', err);
        setError("Une erreur s'est produite lors du chargement des clients.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewClient(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateClient = () => {
    setLoading(true);
    setError(null);

    // Envoyer une requête POST pour créer un nouveau client
    Axios.post(`${API_URL}/clients/`, newClient)
      .then(response => {
        setClients(prevState => [...prevState, response.data]);
        setNewClient({
          name: '',
          responsable: '',
          email: '',
          phone: '',
          address: '',
          city: '',
        });
        setTimeout(() => {
          setDialogOpen(false);
          setLoading(false);
        }, 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la création du client', err);
        setError("Une erreur s'est produite lors de la création du client.");
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
            name="siege"
            label="Siege"
            value={values}
            options={clients}
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
        <DialogTitle>Créer un nouveau client</DialogTitle>
        <DialogContent>
          {loading && <LinearProgress />} {/* Ajout d'un indicateur de chargement */}
          {error && <Alert severity="error">{error}</Alert>} {/* Affichage des erreurs */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="name"
                value={newClient.name}
                onChange={handleInputChange}
                placeholder="Nom du client"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="responsable"
                value={newClient.responsable}
                onChange={handleInputChange}
                placeholder="Responsable"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                name="email"
                value={newClient.email}
                onChange={handleInputChange}
                placeholder="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="phone"
                value={newClient.phone}
                onChange={handleInputChange}
                placeholder="Téléphone"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="address"
                value={newClient.address}
                onChange={handleInputChange}
                placeholder="Adresse"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="city"
                value={newClient.city}
                onChange={handleInputChange}
                placeholder="Ville"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleCreateClient} variant="contained" color="primary" disabled={loading}>
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

ClientComponent.propTypes = {
  onChange: PropTypes.any,
  values: PropTypes.any,
};

export default ClientComponent;
