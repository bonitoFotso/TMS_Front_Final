import { useEffect } from 'react';

import { useAuth } from './useAuth'; // Assurez-vous de remplacer le chemin par le bon chemin vers votre hook useAuth


const useRefreshUserData = () => {
    const { refreshUserData } = useAuth();
    

    useEffect(() => {
        // Déclenchez le rafraîchissement des données de l'utilisateur à chaque changement d'emplacement
        refreshUserData();
    }, [refreshUserData]); // Mettez refreshUserData comme dépendance

    return null; // Ce composant ne rend rien, il déclenche simplement l'effet secondaire du rafraîchissement des données de l'utilisateur
};

export default useRefreshUserData;