import axios from 'axios';
import PropTypes from "prop-types"
import { useState, useEffect } from 'react';

import API_URL from 'src/config';

const TacheList = ({ match }) => {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        // Utiliser le paramètre d'URL pour déterminer quelle vue appeler
        if (match.params.activite_id) {
          response = await axios.get(`${API_URL}/taches/activite/${match.params.activite_id}/`);
        } else if (match.params.status) {
          response = await axios.get(`${API_URL}/taches/status/${match.params.status}/`);
        } else if (match.params.priorite) {
          response = await axios.get(`${API_URL}/taches/priorite/${match.params.priorite}/`);
        }

        setTaches(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [match.params.activite_id, match.params.status, match.params.priorite]);

  return (
    <div>
      <h1>Liste des Tâches</h1>
      <ul>
        {taches.map((tache) => (
          <li key={tache.id}>{tache.nom}</li>
        ))}
      </ul>
    </div>
  );
};

TacheList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      activite_id: PropTypes.any,
      priorite: PropTypes.any,
      status: PropTypes.any
    })
  })
}

export default TacheList;
