import { useState } from 'react';

import { Tab, Box, Tabs } from '@mui/material';

import ClientView from '../../view/clients-view';
import AgenceView from '../../agences/view/agence-view';
import AppelantView from '../../appelants/view/appelant-view';



export default function PageClientsTabs() {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Clients" />
                <Tab label="Agences" />
                <Tab label="Appelants" />
            </Tabs>
            <Box>
                {tabValue === 0 && <ClientView />}
                {tabValue === 1 && <AgenceView />}
                {tabValue === 2 && <AppelantView />}
            </Box>
        </Box>
    );
    
};
