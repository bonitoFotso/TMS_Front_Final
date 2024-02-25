import { useContext } from 'react';

import { AuthContext } from 'src/context/AuthContext'; // Assurez-vous de remplacer le chemin par le bon chemin vers votre AuthContext


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l intérieur d\'un AuthProvider');
    }
    return context;
};
