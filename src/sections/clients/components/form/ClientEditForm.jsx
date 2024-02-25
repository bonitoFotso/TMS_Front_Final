import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Checkbox, TextField, CircularProgress, FormControlLabel } from '@mui/material';

// import { updateClient } from '../api';
import { useClients } from '../../../../context/ClientsContext';




export default function ClientEditForm({ client, onClose }) {

    const { updateClient } = useClients();

    const [formData, setFormData] = useState({
        name: client.name,
        responsable: client.responsable,
        email: client.email,
        phone: client.phone,
        address: client.address,
        city: client.city,
        maintenance: client.maintenance,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'maintenance' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // Envoi des données modifiées au backend pour mise à jour du client
            await updateClient(client.id, formData);
            onClose(); // Fermer le dialogue après la modification du client
        // eslint-disable-next-line no-shadow
        } catch (error) {
            setError('Une erreur s\'est produite lors de la mise à jour du client.');
        } finally {
            setLoading(false);
        }
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
            {error && <p style={{ color: 'red' }}>{error}</p>}

            
            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Enregistrer'}
                </Button>
            </Box>
        </Box>
    );
}

ClientEditForm.propTypes = {
    client: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};
