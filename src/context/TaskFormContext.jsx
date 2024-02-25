// TaskFormContext.js

import PropTypes from "prop-types"
import { useState, useContext, createContext } from 'react';

const TaskFormContext = createContext();

export const TaskFormProvider = ({ children }) => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openTaskForm = (task = null) => {
    setIsTaskFormOpen(true);
    setEditingTask(task);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TaskFormContext.Provider value={{ isTaskFormOpen, openTaskForm, closeTaskForm, editingTask }}>
      {children}
    </TaskFormContext.Provider>
  );
};

TaskFormProvider.propTypes = {
  children: PropTypes.any
}

export const useTaskForm = () => useContext(TaskFormContext);
