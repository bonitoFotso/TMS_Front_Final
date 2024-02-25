import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
  List,
  Divider,
  ListItem,
  Typography,
  ListItemText,
} from '@mui/material';

import API_URL from '../../../config';

const ActivitesViews = () => {
  const [activites, setActivites] = useState([]);
  const [selectedActiviteId, setSelectedActiviteId] = useState(null);
  const [activiteTasks, setActiviteTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/activites`);
        setActivites(response.data);
      } catch (error) {
        console.error('Error fetching activites:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTasksByActivite = async () => {
      if (selectedActiviteId !== null) {
        try {
          const response = await axios.get(`${API_URL}/taches/by_activite/${selectedActiviteId}`);
          setActiviteTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks by activite:', error);
        }
      }
    };

    fetchTasksByActivite();
  }, [selectedActiviteId]);

  const handleActiviteClick = (activiteId) => {
    setSelectedActiviteId(activiteId);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Liste des Activités
      </Typography>

      <List>
        {activites.map((activite) => (
          <React.Fragment key={activite.id}>
            <ListItem button onClick={() => handleActiviteClick(activite.id)}>
              <ListItemText
                primary={activite.name}
                secondary={`Description: ${activite.description}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {selectedActiviteId !== null && (
        <div>
          <Typography variant="h5" gutterBottom>
            Tâches associées à l activité sélectionnée
          </Typography>
          <List>
            {activiteTasks.map((task) => (
              <ListItem key={task.id}>
                <ListItemText primary={task.name} secondary={`Statut: ${task.status}`} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default ActivitesViews;
