import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

export default function ClientDetails({ client }) {
    return (
        <Box>
            <Typography variant="body1" gutterBottom>
                <strong>Nom :</strong>
                {/* Utilisation du composant Link pour créer un lien vers la page des détails du client */}
                <Link to={`/client-details/${client.id}`}>{client.name}</Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Responsable :</strong> {client.responsable}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email :</strong> {client.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Téléphone :</strong> {client.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Adresse :</strong> {client.address}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Ville :</strong> {client.city}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Numéro de client :</strong> {client.n_client}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Est sous contrat de maintenance :</strong> {client.maintenance ? 'Oui' : 'Non'}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Créé le :</strong> {new Date(client.createdAt).toLocaleString()}
            </Typography>
        </Box>
    );
}

ClientDetails.propTypes = {
    client: PropTypes.object.isRequired,
};
