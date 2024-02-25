import { useState } from 'react';
import PropTypes from "prop-types"

import { Button, Checkbox, TextField } from '@mui/material';

const ClientForm = ({ onSubmit, initialValues }) => {
    // Définir des valeurs par défaut pour chaque champ si initialValues est undefined
    const defaultValues = {
        name: '',
        responsable: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        maintenance: false,
    };

    // Utiliser les valeurs initiales si elles sont définies, sinon utiliser les valeurs par défaut
    const [formData, setFormData] = useState(initialValues || defaultValues);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <TextField
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
            />
            <Checkbox
                name="maintenance"
                checked={formData.maintenance}
                onChange={handleChange}
                label="Maintenance"
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

ClientForm.propTypes = {
  initialValues: PropTypes.any,
  onSubmit: PropTypes.func
}

export default ClientForm;
