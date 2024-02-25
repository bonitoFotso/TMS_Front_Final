import { useState } from 'react';
import PropTypes from "prop-types"

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import TaskForm from 'src/sections/taches/components/form/TaskForm'

export default function ViewTask({ task }) {
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
        console.log('hi');
        
    };
    const onSave = (formData) => {
        console.log(formData);
        console.log(task);
        setOpen(false);
    };

    const openModal = () => {
        setOpen(true);
    }
    return (
        <Container>
            <p>
                 view <Button onClick={openModal} >
                    gg
                 </Button>
            </p>
            <TaskForm open={open} handleClose={handleClose} onSave={onSave} />
        </Container>
    );
}
ViewTask.propTypes = {
  task: PropTypes.any
}
