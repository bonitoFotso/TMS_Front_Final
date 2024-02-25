/* eslint-disable no-nested-ternary */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

import API_URL from 'src/config';

import TaskGrid from '../dataGrid/TaskGrid';

const TechAvatarModal = ({ selectedTech, onCloseModal }) => {
  const [tasks, setTasks] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/technicien/${selectedTech.id}/taches`);
        setTasks(response.data);
        setLoading(false);
      // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
        setError(error.message || 'Une erreur s\'est produite');
        setLoading(false);
      }
    };

    if (selectedTech) {
      fetchTasks();
    }
  }, [selectedTech]);


  return (
    <Modal open={Boolean(selectedTech)} onClose={onCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 700,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        {selectedTech && (
          <div >
            <Typography variant="h4">{`${selectedTech.name} ${selectedTech.prenom}`}</Typography>
            <Typography>Téléphone : {selectedTech.tel}</Typography>
            <Typography>Email : {selectedTech.email}</Typography>
            <Typography>Matricule : {selectedTech.matricule}</Typography>
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              tasks ? (
                <div style={{ height: 500, width: '100%' }}>
                  <TaskGrid data={tasks} isModal />
                </div>
              ) : (
                <CircularProgress />
              )
            )}
            <Button onClick={onCloseModal}>Fermer</Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

TechAvatarModal.propTypes = {
  selectedTech: PropTypes.object,
  onCloseModal: PropTypes.func.isRequired,
};

export default TechAvatarModal;
