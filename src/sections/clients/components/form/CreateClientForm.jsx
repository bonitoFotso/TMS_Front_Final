import { useState } from 'react';
import PropTypes from "prop-types"

import { Box, Button, Checkbox, TextField, FormControlLabel } from '@mui/material';

import { useClients } from '../../../../context/ClientsContext';


function CreateClientForm({ onCreate }) {

    const { addClient } = useClients();


    const [formData, setFormData] = useState({
        name: '',
        responsable: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        maintenance: false,
    });

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'maintenance' ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(formData);
        addClient(formData)
        // Passer les données du formulaire à la fonction de création de client
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                id="name"
                name="name"
                label="Nom"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                id="responsable"
                name="responsable"
                label="Responsable"
                variant="outlined"
                value={formData.responsable}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                id="phone"
                name="phone"
                label="Téléphone"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                id="address"
                name="address"
                label="Adresse"
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                id="city"
                name="city"
                label="Ville"
                variant="outlined"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={<Checkbox id="maintenance" name="maintenance" checked={formData.maintenance} onChange={handleChange} />}
                label="Sous contrat de maintenance"
            />
            <Button type="submit" variant="contained" color="primary">
                Créer
            </Button>
        </Box>
    );
}

CreateClientForm.propTypes = {
  onCreate: PropTypes.func
}

export default CreateClientForm;
