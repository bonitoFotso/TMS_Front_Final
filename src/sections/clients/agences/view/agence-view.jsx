import React, { useEffect } from 'react';

import Container from '@mui/material/Container';

import { useAgences } from '../../../../context/AgencesContext';
import AgenceDataGrid from '../components/datagrid/AgenceDataGrid';
import CustomLoader from '../../../../components/loader/CustomLoader';



export default function AgenceView() {
    const { agences, agenceLoading, agenceError, fetchAgences } = useAgences();
    console.log(agences,'jjjjjjj');

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchAgences();
            } catch (error) {
                console.error('Error loading agences:', error);
                // Gérer l'erreur ici, par exemple, afficher un message d'erreur ou envoyer des données à un service de suivi des erreurs
            }
        };
        loadData();
    }, [fetchAgences]);

    return(
        <Container maxWidth="xxl">
        <p>Vue des agence</p>
            {agenceLoading && <CustomLoader />}
            {!agenceLoading && !agenceError && <AgenceDataGrid agences={agences} />}
            {agenceError && <p> Une erreur s est produite lors du chargement des données des agences.</p>}
    </Container>
    )
    
}