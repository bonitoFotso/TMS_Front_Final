/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import API_URL from '../../../config';
import TechnicianCard from '../components/technician-card';

export default function TechniciansView() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTechniciens = async () => {
       try {
          const response = await axios.get(`${API_URL}/techniciens/`); // Mettez l'URL correcte de votre API Django
          setTechnicians(response.data);
          setLoading(false);
       // eslint-disable-next-line no-shadow
       } catch (error) {
          console.error('Erreur lors de la récupération des techniciens :', error);
          setError(error);
          setLoading(false);
       }
    };

    fetchTechniciens();
 }, []);

  return (
    <Container>
      <p>Liste des Tecniciens </p>
      <Grid container spacing={3}>
      {technicians.map((technician, index) => (
        <TechnicianCard key={technician.id} technician={technician} index={index} />
      )) }
    </Grid>
      
    </Container>
  );
}
