import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useContext, useCallback, createContext } from 'react';

import API_URL from '../config';

const AppelantsContext = createContext();

const getToken = () => localStorage.getItem('token');

export const useAppelants = () => useContext(AppelantsContext);

export const AppelantsProvider = ({ children }) => {
    const [appelants, setAppelants] = useState([]);
    const [appelant, setAppelant] = useState([]);
    const [appelantloading, setAppelantLoading] = useState(false);
    const [appelanterror, setAppelantError] = useState(null);
    const token = getToken();

    const fetchAppelants = useCallback(async () => {
        setAppelantLoading(true);
        try {
            const response = await axios.get(`${API_URL}/appelants/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setAppelants(response.data);
            setAppelantError(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            setAppelantError(error.response?.data?.message || 'An error occurred while fetching data.');
        } finally {
            setAppelantLoading(false);
        }
    }, [token]);

    const fetchAppelant = useCallback(async (appelantId) => {
        setAppelantLoading(true);
        try {
            const response = await axios.get(`${API_URL}/appelants/${appelantId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setAppelant(response.data);
            setAppelantError(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            setAppelantError(error.response?.data?.message || 'An error occurred while fetching data.');
        } finally {
            setAppelantLoading(false);
        }
    }, [token]);

    const addAppelant = useCallback(async (newAppelantsData) => {
        setAppelantLoading(true);
        try {
            const response = await axios.post(`${API_URL}/appelant/`, newAppelantsData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setAppelants(prevAppelants => [...prevAppelants, response.data]);
            setAppelantLoading(null);
        } catch (error) {
            console.error('Error creating appelant:', error);
            setAppelantError(error.response?.data?.message || `Une erreur s est produite lors de la création de l appelant.`);
            throw error;
        }
    }, [token]);

    const updateAppelant = useCallback(async (appelantId, updatedAppelantData) => {
        setAppelantLoading(true);
        try {
            const response = await axios.put(`${API_URL}/appelant/appelantId/`, updatedAppelantData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const updatedAppelants = appelants.map(appelantu =>
                appelantu.id === appelantId ? response.data : appelantu
            );
            setAppelants(updatedAppelants);
            setAppelantLoading(null);
        } catch (error) {
            console.error('Error updating appelant:', error);
            setAppelantError(error.response?.data?.message || `Une erreur s'est produite lors de la mise à jour de l'appelant.`);
            throw error;
        }
    }, [token, appelants]);

    const deleteAppelant = useCallback(async (appelantId) => {
        setAppelantLoading(true);
        try {
            await axios.delete(`${API_URL}/appelant/${appelantId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setAppelants(prevAppelants => prevAppelants.filter(appelantd => appelantd.id !== appelantId)); // Supprimer l'appelant de la liste
            setAppelantLoading(false); // Fin du chargement
        } catch (error) {
            console.error('Error deleting appelant:', error);
            setAppelantError(error.response?.data?.message || `Une erreur s'est produite lors de la suppression de l'appelant.`);
            throw error;
        }
    }, [token]);


    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <AppelantsContext.Provider value={{ appelants, appelant, appelantloading, appelanterror, fetchAppelants, fetchAppelant, addAppelant, updateAppelant, deleteAppelant }}>
            {children}
        </AppelantsContext.Provider>
    );
};

AppelantsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};