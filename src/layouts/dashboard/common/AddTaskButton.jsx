import IconButton from '@mui/material/IconButton';

import { useTaskForm } from 'src/context/TaskFormContext';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function AddTaskButton() {
  const { openTaskForm } = useTaskForm();





  return (
    <IconButton
    onClick={() => openTaskForm()}
        sx={{
          width: 40,
          height: 40,
          
        }}
      >
        <img src='/assets/icons/tasks.svg' alt='+' />
      </IconButton>
  );
}
