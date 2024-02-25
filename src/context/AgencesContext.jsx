import axios from "axios";
import PropTypes from "prop-types";
import { useState, useContext, useCallback, createContext } from 'react';

import API_URL from "../config";

// Création du contexte pour les agences
const AgencesContext = createContext();

// Fonction utilitaire pour obtenir le token d'authentification depuis le stockage local
const getToken = () => localStorage.getItem('token');

// Hook personnalisé pour utiliser le contexte des agences
export const useAgences = () => useContext(AgencesContext);

// Provider pour les agences
export const AgencesProvider = ({ children }) => {
    const [agences, setAgences] = useState([]); // État pour stocker les agences
    const [agence, setAgence] = useState([]); // État pour stocker l'agences
    const [agenceLoading, setAgenceLoading] = useState(false); // État pour indiquer le chargement des agences
    const [agenceError, setAgenceError] = useState(null); // État pour stocker les erreurs liées aux agences
    const token = getToken(); // Récupérer le token d'authentification

    // Fonction pour récupérer la liste des agences depuis le backend
    const fetchAgences = useCallback(async () => {
        setAgenceLoading(true); // Indiquer le début du chargement
        try {
            const response = await axios.get(`${API_URL}/agences/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setAgences(response.data); // Mettre à jour la liste des agences
            setAgenceLoading(null); // Effacer les éventuelles erreurs précédentes
        } catch (error) {
            console.error('Error fetching Agences:', error);
            setAgenceError(error.response?.data?.message || 'Une erreur s\'est produite lors du chargement des agences.');
        } finally {
            setAgenceLoading(false); // Indiquer la fin du chargement
        }
    }, [token]);

    const fetchAgence = useCallback(async (agenceId) => {
        setAgenceLoading(true); // Indiquer le début du chargement
        try {
            const response = await axios.get(`${API_URL}/agences/${agenceId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setAgence(response.data); // Mettre à jour la liste des agences
            setAgenceLoading(null); // Effacer les éventuelles erreurs précédentes
        } catch (error) {
            console.error('Error fetching Agence:', error);
            setAgenceError(error.response?.data?.message || 'Une erreur s\'est produite lors du chargement de l agence.');
        } finally {
            setAgenceLoading(false); // Indiquer la fin du chargement
        }
    }, [token]);

    // Fonction pour ajouter une nouvelle agence via le backend
    const addAgence = useCallback(async (newAgencyData) => {
        try {
            const response = await axios.post(`${API_URL}/agences/`, newAgencyData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAgences(prevAgences => [...prevAgences, response.data]); // Ajouter la nouvelle agence à la liste
            setAgenceLoading(null); // Effacer les éventuelles erreurs précédentes
        } catch (error) {
            console.error('Error creating agency:', error);
            setAgenceError(error.response?.data?.message || 'Une erreur s\'est produite lors de la création de l\'agence.');
            throw error;
        }
    }, [token]);

    const updateAgence = useCallback(async (agenceId, updatedAgenceData) => {
        try {
            const response = await axios.put(`${API_URL}/agences/${agenceId}/`, updatedAgenceData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedAgences = agences.map(agenceu =>
                agenceu.id === agenceId ? response.data : agenceu
            );
            setAgences(updatedAgences);
            setAgenceLoading(null);
        } catch (error) {
            console.error('Error updating client:', error);
            setAgenceLoading(error.response?.data?.message || 'Une erreur s\'est produite lors de la mise à jour de l agence.');
            throw error;
        }
    }, [token, agences]);

    // Fonction pour supprimer une agence via le backend
    const deleteAgence = useCallback(async (agencyId) => {
        try {
            await axios.delete(`${API_URL}/agences/${agencyId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAgences(prevAgences => prevAgences.filter(agency => agency.id !== agencyId)); // Supprimer l'agence de la liste
            setAgenceLoading(null); // Effacer les éventuelles erreurs précédentes
        } catch (error) {
            console.error('Error deleting agency:', error);
            setAgenceError(error.response?.data?.message || 'Une erreur s\'est produite lors de la suppression de l\'agence.');
            throw error;
        }
    }, [token]);

    // Mettre à disposition les agences et les fonctions associées via le contexte
    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <AgencesContext.Provider value={{ agence, agences, agenceLoading, agenceError, fetchAgences, addAgence, deleteAgence, updateAgence, fetchAgence }}>
            {children}
        </AgencesContext.Provider>
    );
};

AgencesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
