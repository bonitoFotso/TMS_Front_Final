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

import AgenceComponent from './AgenceComponent';


const AppelantComponent = ({ values, onChange }) => {
  const [appelants, setAppelants] = useState([]);
  const [nouvelAppelant, setNouvelAppelant] = useState({
    name: '',
    agence: '',
    phone: '699913839',
    email: 'email@email.com',
  });
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    // Charger tous les appelants lors du montage du composant
    setChargement(true);
    Axios.get(`${API_URL}/appelants/`)
      .then(response => {
        setAppelants(response.data);
        setChargement(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des appelants', err);
        setErreur("Une erreur s'est produite lors du chargement des appelants.");
        setChargement(false);
      });
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNouvelAppelant(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateAppelant = () => {
    setChargement(true);
    setErreur(null);

    // Envoyer une requête POST pour créer un nouvel appelant
    Axios.post(`${API_URL}/appelants/`, nouvelAppelant)
      .then(response => {
        setAppelants(prevState => [...prevState, response.data]);
        setNouvelAppelant({
          name: '',
          agence: null,
          phone: '699913839',
          email: 'email@email.com',
        });
        setTimeout(() => {
          setDialogOuvert(false);
          setChargement(false);
        }, 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la création de l\'appelant', err);
        setErreur("Une erreur s'est produite lors de la création de l'appelant.");
        setChargement(false);
      });
  };

  const handleOuvrirDialog = () => {
    setDialogOuvert(true);
  };

  const handleFermerDialog = () => {
    setDialogOuvert(false);
    setErreur(null);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <Grid item xs={10}>
          <SelectField
            name="appelant"
            label="Appelant"
            value={values}
            options={appelants}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleOuvrirDialog} aria-label="Modifier">
            <Icon icon="line-md:edit-twotone-full" width="30" />
          </Button>
        </Grid>
      </Grid>
      <Dialog open={dialogOuvert} onClose={handleFermerDialog}>
        <DialogTitle>Créer un nouvel appelant</DialogTitle>
        <DialogContent>
          {chargement && <LinearProgress />} {/* Indicateur de chargement */}
          {erreur && <Alert severity="error">{erreur}</Alert>} {/* Message d'erreur */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="name"
                value={nouvelAppelant.name}
                onChange={handleInputChange}
                placeholder="Nom de l'appelant"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <AgenceComponent
                values={nouvelAppelant.agence}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="phone"
                value={nouvelAppelant.phone}
                onChange={handleInputChange}
                placeholder="Téléphone"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                name="email"
                value={nouvelAppelant.email}
                onChange={handleInputChange}
                placeholder="Email"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFermerDialog} disabled={chargement}>
            Annuler
          </Button>
          <Button onClick={handleCreateAppelant} variant="contained" color="primary" disabled={chargement}>
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

AppelantComponent.propTypes = {
  onChange: PropTypes.any,
  values: PropTypes.any,
};

export default AppelantComponent;
