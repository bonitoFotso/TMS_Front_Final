// TaskGrid.js
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import './style.css'; 



const TaskGrid = ({ tasks, handleEditClick }) => {
   // ... (rest of the code for TaskGrid component)
   const renderActivite = (params) => (
      <span>
         {params.row.activite.map((act) => (
            <div key={act.id}>{act.name}</div>
         ))}
      </span>
   );

   const renderCategorie = (params) => (
      <span>
         {params.row.categorie.map((cat) => (
            <div key={cat.id}>{cat.name}</div>
         ))}
      </span>
   );

   const renderAppelant = (params) => <span>{params.row.appelant.name}</span>;
   const rendertechnicien = (params) => <span>{params.row.assignations.map((tec) => tec.name).join(', ')}</span>;

   const generateColumns = () => [
         { field: 'id', headerName: 'ID', flex: 1, cellClassName: (params) => `custom-id-cell-${params.value}` },
         { field: 'name', headerName: 'name', flex: 4, cellClassName: (params) => `custom-name-cell-${params.value}` },
         { field: 'status', headerName: 'Statut', flex: 2, cellClassName: (params) => `status-${params.value}` },
         { field: 'priorite', headerName: 'Priorité', flex: 2, cellClassName: (params) => `custom-priorite-cell-${params.value}` },
         {
            field: 'activite',
            headerName: 'Activité',
            flex: 2,
            renderCell: renderActivite,
            cellClassName: (params) => `custom-activite-cell-${params.value}`,
         },
         {
            field: 'categorie',
            headerName: 'Catégorie',
            flex: 2,
            renderCell: renderCategorie,
            cellClassName: (params) => `custom-categorie-cell-${params.value}`,
         },
         {
            field: 'appelant',
            headerName: 'Appelant',
            flex: 2,
            renderCell: renderAppelant,
            cellClassName: (params) => `custom-appelant-cell-${params.value}`,
         },
         {
            field: 'assignations',
            headerName: 'Techniciens',
            flex: 2,
            renderCell: rendertechnicien,
            cellClassName: (params) => `custom-assignations-cell-${params.value}`,
         },
         {
            field: 'edit',
            headerName: 'Modifier',
            flex: 2,
            renderCell: (params) => <Button onClick={() => handleEditClick(params.row)}>Modifier</Button>,
            cellClassName: 'custom-edit-cell',
         },
      ];

   const columns = generateColumns();
   const getRowId = (row) => row.id;

   const getRowStyle = (params) => {
      // Personnalisez le style de la ligne en fonction des valeurs des champs ok, status, et priorite
      const style = {};

      if (params.row.ok) {
         style.backgroundColor = '#8BC34A'; // Couleur de fond pour les tâches OK
      }

      if (params.row.status === 'En attente') {
         style.backgroundColor = '#FFC107'; // Couleur de fond pour les tâches en attente
      }

      if (params.row.priorite === 'Élevé') {
         style.fontWeight = 'bold'; // Mise en gras pour les tâches prioritaires
      }

      return style;
   };

   return <DataGrid 
   rows={tasks} 
   columns={columns} 
   pageSize={10} 
   slots={{ toolbar: GridToolbar }} 
   getRowId={getRowId}
   getRowStyle={getRowStyle}
   />;
};

TaskGrid.propTypes = {
   handleEditClick: PropTypes.func,
   tasks: PropTypes.any
};

export default TaskGrid;
