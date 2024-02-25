import axios from 'axios';
import React, { useState, useEffect } from 'react';

import API_URL from '../../../config';


const UserDetails = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token non trouvé');
                }

                const response = await axios.get(`${API_URL}/user-details/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            // eslint-disable-next-line no-shadow
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <>
                    {userData ? (
                        <div>
                            <h2>Informations de l utilisateur</h2>
                            <p>Nom d utilisateur : {userData.username}</p>
                            <p>Permissions : {userData.permissions.join(', ')}</p>
                        </div>
                    ) : (
                        <p>Aucune donnée d utilisateur trouvée</p>
                    )}
                </>
            )}
            {error && <p>Erreur: {error}</p>}
        </div>
    );
};

export default UserDetails;
