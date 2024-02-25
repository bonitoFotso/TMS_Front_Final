/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import { Grid, Container, Typography } from '@mui/material';

import ClientList from './ClientList';
import { getClients, deleteClient } from './api'; // Importer les fonctions API pour les opérations CRUD

const ClientManagement = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    // Charger la liste des clients au chargement du composant
    useEffect(() => {
        fetchClients();
    }, []);

    // Fonction pour charger la liste des clients
    const fetchClients = async () => {
        try {
            const data = await getClients();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    // Fonction pour soumettre le formulaire d'ajout ou de mise à jour d'un client
   

    // Fonction pour supprimer un client
    const handleDeleteClient = async (clientId) => {
        try {
            await deleteClient(clientId);
            await fetchClients(); // Recharger la liste des clients après la suppression
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    // Fonction pour mettre à jour les données du client sélectionné dans le formulaire
    const handleEditClient = (clientId) => {
        const selected = clients.find((client) => client.id === clientId);
        setSelectedClient(selected);
    };

    // Fonction pour annuler l'édition ou l'ajout de client et réinitialiser le formulaire
    

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Client Management
            </Typography>
            
        </Container>
    );
};

export default ClientManagement;
