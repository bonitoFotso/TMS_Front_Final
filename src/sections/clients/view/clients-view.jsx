import React, { useEffect } from 'react';

import Container from '@mui/material/Container';

import ClientDataGrid from '../components/ClientDataGrid';
import { useClients } from '../../../context/ClientsContext';
import CustomLoader from '../../../components/loader/CustomLoader';



export default function ClientView() {
	const { clients, clientLoading, clientError, fetchClients } = useClients();

	useEffect(() => {
		const loadData = async () => {
			try {
				await fetchClients();
			} catch (error) {
				console.error('Error loading clients:', error);
				// Gérer l'erreur ici, par exemple, afficher un message d'erreur ou envoyer des données à un service de suivi des erreurs
			}
		};
		loadData();
	}, [fetchClients]);

	return (
		<Container maxWidth="xxl">

			<p>Vue des clients</p>

			{clientLoading && <CustomLoader />}
			{!clientLoading && !clientError && <ClientDataGrid clients={clients} />}
			{clientError && <p>Une erreur s est produite lors du chargement des données des clients.</p>}
		</Container>
	);
}
