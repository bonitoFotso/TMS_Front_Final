import { useState } from 'react';
import PropTypes from "prop-types"

import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import CreateClientForm from './form/CreateClientForm';
import ClientDetailsModal from './modals/ClientDetailsModal';
import CustomDialog from '../../../components/modal/CustomDialog';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'responsable', headerName: 'Responsable', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'n_client', headerName: 'Client Number', width: 150 },
    { field: 'maintenance', headerName: 'Maintenance', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
];

export default function ClientDataGrid({ clients }) {
    const [selectedClient, setSelectedClient] = useState(null);
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);

    const handleRowClick = (params) => {
        setSelectedClient(params.row);
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
    };

    const handleCreateClient = (formData) => {
        // Logique de création du client à implémenter ici
        console.log('Nouveau client créé :', formData);
        handleCloseModal(); // Fermer le dialogue après la création du client
    };

    

    const handleOpenCreateTaskModal = () => {
        setOpenCreateTaskModal(true);
    };

    const handleCloseCreateTaskModal = () => {
        setOpenCreateTaskModal(false);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button onClick={handleOpenCreateTaskModal} variant="contained" color="primary">Créer un client</Button>

            <DataGrid
                rows={clients}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                onRowClick={handleRowClick}
            />
            <CustomDialog
                open={Boolean(openCreateTaskModal)}
                onClose={handleCloseCreateTaskModal}
                title="Créer un client"
                actions={[{ handler: handleCloseCreateTaskModal, label: 'Annuler' }, { handler: handleCreateClient, label: 'Créer' }]}
            >
                <CreateClientForm onCreate={handleCreateClient} />
            </CustomDialog>
            {/* Modal de création de tâche à intégrer ici */}
            <ClientDetailsModal
                open={Boolean(selectedClient)}
                onClose={handleCloseModal}
                client={selectedClient}
            />
        </div>
    );
}

ClientDataGrid.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.object).isRequired,
};
