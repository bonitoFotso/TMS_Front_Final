/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import API_URL from 'src/config';

import Sort from 'src/components/sort/Sort';

import TaskTab from 'src/sections/taches/components/TaskTab';
// import TaskCard from '../components/TaskCard';



export default function TacheView() {

  const [tasks, setTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSortChange = (sortOption, selectedFilter) => {
    // Effectuez des actions spécifiques en fonction de la sélection de tri et de filtrage
    console.log('Sort Option:', sortOption);
    console.log('Selected Filter:', selectedFilter);

    // Par exemple, vous pourriez déclencher une nouvelle requête avec les options de tri et de filtrage
    // axios.get(`/api/taches?sort=${sortOption}&filter=${selectedFilter}`).then(response => {
    //   // Faire quelque chose avec les données
    // });
  };
  useEffect(() => {
    const fetchTasks = async () => {
       try {

         const {token} = localStorage;

          const response = await axios.get(`${API_URL}/taches/`,
            {
              headers: {
                HTTP_AUTHORIZATION: `Bearer ${token}`,
              },
            }
          ); // Mettez l'URL correcte de votre API Django
          setTasks(response.data);
          setLoading(false);
       // eslint-disable-next-line no-shadow
       } catch (error) {
          console.error('Erreur lors de la récupération des clients :', error);
          setError(error);
          setLoading(false);
       }
    };

    fetchTasks();
 }, []);
  return (
    <Container maxWidth="xl">
      <p>taches view</p>
      <Grid>
        <Sort setTasks={setTasks} />
      </Grid>
      <Grid container spacing={3}>
        <TaskTab tasks={tasks}/>
    </Grid>
    </Container>
  );
}
