// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

import PropTypes from "prop-types"

import { DataGrid } from '@mui/x-data-grid';

const AgenceDataGrid = ({ agences }) => {
    // État pour stocker les données des agences
    

    // Définition des colonnes pour le DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'name', headerName: 'Nom', width: 150 },
        { field: 'responsable', headerName: 'Responsable', width: 200 },
        { field: 'address', headerName: 'Adresse', width: 100 },
        { field: 'city', headerName: 'Ville', width: 150 },
        { field: 'phone', headerName: 'Téléphone', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'n_agence', headerName: 'Numéro Agence', width: 150 },
        
    ];


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={agences}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

AgenceDataGrid.propTypes = {
  agences: PropTypes.any
}

export default AgenceDataGrid;
