import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Box, Button, Dialog, Typography, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { useClients } from '../../../context/ClientsContext';

const ClientDelete = ({ client }) => {
    const { id, name } = client;
    const { deleteClient } = useClients();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // Appeler la fonction onDelete avec l'ID de la tâche pour la supprimer
        deleteClient(id);
        setOpen(false);
    };

    return (
        <>
            <Box textAlign="center"> {/* Container pour centrer le bouton */}
                <Button variant="contained" color="error" onClick={handleOpen}>
                    Supprimer
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <Typography>Êtes-vous sûr de vouloir supprimer ce client: {name} ? </Typography>
                    <Typography>Cette action est irréversible.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Non
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

ClientDelete.propTypes = {
    client: PropTypes.object.isRequired,
};

export default ClientDelete;
