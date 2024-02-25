import PropTypes from "prop-types"

import { DataGrid } from '@mui/x-data-grid';

import { formatDate } from 'src/sections/test/components/date/format-date';

const TaskGrid = ({ data, isModal }) => {
  // Colonnes du DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'status', headerName: 'Statut', width: 120 },
    { field: 'priorite', headerName: 'Priorité', width: 120 },
    {
      field: 'date_debut',
      headerName: 'Date de début',
      width: 180,
      valueGetter: (params) => formatDate(params.row.date_debut),
    },
    {
      field: 'date_fin',
      headerName: 'Date de fin',
      width: 180,
      valueGetter: (params) => (params.row.date_fin ? formatDate(params.row.date_fin) : ''),
    },
  ];

  // Transforme les données pour les rendre compatibles avec le DataGrid
  const rows = data.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    priorite: item.priorite,
    date_debut: item.date_debut,
    date_fin: item.date_fin,
  }));

  // Style conditionnel en fonction de isModal
  const containerStyle = isModal ? { height: 500, width: '100%' } : { height: 400, width: '100%' };

  return (
    <div style={containerStyle}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

TaskGrid.propTypes = {
  data: PropTypes.array.isRequired,
  isModal: PropTypes.bool,
};

export default TaskGrid;
