/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import API_URL from 'src/config';          

import TaskTab from '../components/TaskListTab';

export default function TechnicienTacheView() {

    const [tasks, setTasks] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {

                const token = localStorage.getItem('token') ;
                console.log(token);
                axios.defaults.headers.common.HTTP_AUTHORIZATION = `Bearer ${token}`;

                const response = await axios.get(`${API_URL}/technicien-taches/`,
                    // {
                    //     headers: {
                    //         HTTP_AUTHORIZATION: `Bearer ${token}`,
                    //     },
                    // }
                ); // Mettez l'URL correcte de votre API Django
                setTasks(response.data);
                console.log(response.data);
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
            <p>Liste des Taches</p>
           
            <Grid container spacing={3}>
                <TaskTab tasks={tasks} />
            </Grid>
        </Container>
    );
}