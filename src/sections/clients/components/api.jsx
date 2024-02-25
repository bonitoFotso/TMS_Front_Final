// Importez axios pour effectuer les requêtes HTTP
import axios from 'axios';

import API_URL from '../../../config';


// Fonction pour récupérer le token d'authentification depuis le local storage
const getToken = () => localStorage.getItem('token');
// Fonction pour récupérer la liste des clients depuis le backend
export const getClients = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/clients/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

// Fonction pour créer un nouveau client via le backend
export const createClient = async (newClientData) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/clients/`, newClientData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
};

// Fonction pour mettre à jour un client existant via le backend
export const updateClient = async (clientId, updatedClientData) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/clients/${clientId}/`, updatedClientData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

// Fonction pour supprimer un client via le backend
export const deleteClient = async (clientId) => {
    try {
        const token = getToken();
        await axios.delete(`${API_URL}/clients/${clientId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
};
