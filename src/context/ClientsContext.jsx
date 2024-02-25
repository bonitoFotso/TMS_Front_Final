import axios from "axios";
import PropTypes from "prop-types";
import { useState, useContext, useCallback, createContext } from 'react';

import API_URL from "../config";

const ClientsContext = createContext();

const getToken = () => localStorage.getItem('token');

export const useClients = () => useContext(ClientsContext);

export const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState([]);
    const [clientLoading, setClientLoading] = useState(false);
    const [clientError, setClientError] = useState(null);
    const token = getToken();

    const fetchClient = useCallback(async (clientId) => {
        setClientLoading(true);
        try {
            const response = await axios.get(`${API_URL}/clients/${clientId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setClient(response.data);
            setClientError(null);
        } catch (error) {
            console.error('Error fetching client:', error);
            setClientError(error.response?.data?.message || 'Une erreur s\'est produite lors du chargement des clients.');
        } finally {
            setClientLoading(false);
        }
    }, [token]);

    const fetchClients = useCallback(async () => {
        setClientLoading(true);
        try {
            const response = await axios.get(`${API_URL}/clients/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setClients(response.data);
            setClientError(null);
        } catch (error) {
            console.error('Error fetching clients:', error);
            setClientError(error.response?.data?.message || 'Une erreur s\'est produite lors du chargement des clients.');
        } finally {
            setClientLoading(false);
        }
    }, [token]);

    const addClient = useCallback(async (newClientData) => {
        try {
            const response = await axios.post(`${API_URL}/clients/`, newClientData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClients(prevClients => [...prevClients, response.data]);
            setClientError(null);
        } catch (error) {
            console.error('Error creating client:', error);
            setClientError(error.response?.data?.message || 'Une erreur s\'est produite lors de la création du client.');
            throw error;
        }
    }, [token]);

    const updateClient = useCallback(async (clientId, updatedClientData) => {
        try {
            const response = await axios.put(`${API_URL}/clients/${clientId}/`, updatedClientData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedClients = clients.map(clientu =>
                clientu.id === clientId ? response.data : clientu
            );
            setClients(updatedClients);
            setClientError(null);
        } catch (error) {
            console.error('Error updating client:', error);
            setClientError(error.response?.data?.message || 'Une erreur s\'est produite lors de la mise à jour du client.');
            throw error;
        }
    }, [token, clients]);

    const deleteClient = useCallback(async (clientId) => {
        try {
            await axios.delete(`${API_URL}/clients/${clientId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClients(prevClients => prevClients.filter(clientd => clientd.id !== clientId));
            setClientError(null);
        } catch (error) {
            console.error('Error deleting client:', error);
            setClientError(error.response?.data?.message || 'Une erreur s\'est produite lors de la suppression du client.');
            throw error;
        }
    }, [token]);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <ClientsContext.Provider value={{ clients, client, clientLoading, clientError, fetchClients, fetchClient, addClient, updateClient, deleteClient }}>
            {children}
        </ClientsContext.Provider>
    );
};

ClientsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
