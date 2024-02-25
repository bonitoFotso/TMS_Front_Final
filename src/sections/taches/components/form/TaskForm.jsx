import Axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import API_URL from 'src/config';
import { useTaskForm } from 'src/context/TaskFormContext';

import InputNOs from 'src/components/form/InputNOs';
import SelectField from 'src/components/form/SelectField';
import DateTimeField from 'src/components/form/DateTimeField';
import InputTextField from 'src/components/form/InputTextField';
import ActiviteComponent from 'src/components/form/ActiviteComponent';
import AppelantComponent from 'src/components/form/AppelantComponent';
import CategorieComponent from 'src/components/form/CategorieComponent';
import { statusOptions, priorityOptions } from 'src/components/form/options';




const TaskForm = ({ task }) => {

  const { closeTaskForm, isTaskFormOpen, } = useTaskForm();



  const [formData, setFormData] = useState({
    name: '',
    status: 'En attente',
    activite: [],
    categorie: [],
    appelant: [],
    priorite: 'Moyen',
    description: '',
    n_OS: '',
    date_debut: null,
    date_fin: null,
  });

  useEffect(() => {
    if (task) {
      // Si une tâche est fournie, remplir le formulaire avec les données de la tâche
      setFormData({
        name: task.name || '',
        activite: task.activite || [],
        categorie: task.categorie || [],
        appelant: task.appelant || [],
        status: task.status || 'En attente',
        priorite: task.priorite || 'Moyen',
        description: task.description || '',
        n_OS: task.n_OS || '',
        date_debut: task.date_debut || null,
        date_fin: task.date_fin || null,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(name,value);
  };

  const createTask = async (taskData) => {
    try {
      const response = await Axios.post(`${API_URL}/taches/`, taskData);
      return response.data; // La réponse de votre API après la création
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
      throw error; // Vous pouvez gérer les erreurs de manière appropriée dans votre application
    }
  };


  const handleClose = () => {
    closeTaskForm();
  };


  const handleSave = () => {
    createTask(formData);
    handleClose();
  };

  

  return (
    <Dialog open={isTaskFormOpen} onClose={handleClose}  >
      <DialogTitle>{task ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Box sx={{ p: 2 }}>
        <ActiviteComponent values={formData.activite} onChange={handleChange} />
        <CategorieComponent values={formData.categorie} onChange={handleChange} />
        <AppelantComponent values={formData.appelant} onChange={handleChange} />
        <InputTextField
          fullWidth
          label="Nom de la tâche"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <SelectField 
        name="status" 
        label="status" 
        value={formData.status}
        options={statusOptions} 
        onChange={handleChange}
        optionsType="status"
        helperText="Sélectionnez un statut"
        />
        <SelectField
         label="Priorité"
         name="priority"
         value={formData.priorite}
         onChange={handleChange}
         options={priorityOptions}
         optionsType="priority"
         helperText="Sélectionnez une priorité"
      />
        
        <InputTextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <InputNOs
          fullWidth
          label="Numéro d'OS"
          name="n_OS"
          value={formData.n_OS}
          onChange={handleChange}
        />
        
        <DateTimeField 
        label="Date de debut"
        name="date_debut"
        value={formData.date_debut}
        onChange={handleChange}
        />
        <DateTimeField 
        label="Date de fin"
        name="date_fin"
        value={formData.date_fin}
        onChange={handleChange}
        />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TaskForm.propTypes = {
  task: PropTypes.object, // Si vous fournissez une tâche, le formulaire sera pré-rempli pour la modification
};

export default TaskForm;
