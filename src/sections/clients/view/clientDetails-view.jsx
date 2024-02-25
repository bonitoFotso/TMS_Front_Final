import {  useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useClients } from 'src/context/ClientsContext';

export default function CliensDetailView() {
    const { id } = useParams(); // Obtenez l'ID du client à partir des paramètres d'URL
    const { client,  fetchClient } = useClients();
   //  const [clientDetail, setClientDetail] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchClient(id);
            } catch (error) {
                console.error('Error loading clients:', error);
                // Gérer l'erreur ici, par exemple, afficher un message d'erreur ou envoyer des données à un service de suivi des erreurs
            }
        };
        loadData();
    }, [fetchClient,id]);
    // Affichez les détails du client une fois qu'ils ont été chargés
    return (
        <div>
            <h2>Client Details</h2>
            <p>Name: {client.name}</p>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            {/* Ajoutez d'autres détails du client selon vos besoins */}
        </div>
    );
};

