import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
  List,
  Divider,
  ListItem,
  Typography,
  ListItemText,
} from '@mui/material';

import API_URL from 'src/config';

const CategoriesViews = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryTasks, setCategoryTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTasksByCategory = async () => {
      if (selectedCategoryId !== null) {
        try {
          const response = await axios.get(`${API_URL}/taches/by_categorie/${selectedCategoryId}`);
          setCategoryTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks by category:', error);
        }
      }
    };

    fetchTasksByCategory();
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Liste des Catégories
      </Typography>

      <List>
        {categories.map((categorie) => (
          <React.Fragment key={categorie.id}>
            <ListItem button onClick={() => handleCategoryClick(categorie.id)}>
              <ListItemText
                primary={categorie.name}
                secondary={`Description: ${categorie.description}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {selectedCategoryId !== null && (
        <div>
          <Typography variant="h5" gutterBottom>
            Tâches associées à la catégorie sélectionnée
          </Typography>
          <List>
            {categoryTasks.map((task) => (
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

export default CategoriesViews;
