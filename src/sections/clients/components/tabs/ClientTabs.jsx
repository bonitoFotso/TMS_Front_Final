import { useState } from 'react';
import PropTypes from 'prop-types';

import { Tab, Box, Tabs } from '@mui/material';

import ClientDetails from '../ClientDetails'; // Importez le composant de détail du client
import ClientEditForm from '../form/ClientEditForm'; // Importez le composant de modification du client
import ClientDelete from '../ClientDelete';


export default function ClientTabs({ client, onClose }) {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Détails du client" />
                <Tab label="Modifier le client" />
                <Tab label="Supprimer le client" />
            </Tabs>
            <Box>
                {tabValue === 0 && <ClientDetails client={client} />}
                {tabValue === 1 && <ClientEditForm client={client} onClose={onClose} />}
                {tabValue === 2 && <ClientDelete client={client} />}
            </Box>
        </Box>
    );
}

ClientTabs.propTypes = {
  client: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}
