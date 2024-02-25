import PropTypes from 'prop-types';

import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const CustomDialog = ({ open, onClose, title, actions, children }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
            {actions.map((action, index) => (
                
                    <Button
                        key={index}
                        onClick={action.handler}
                        color={action.color || 'primary'} // Utilisez la couleur par défaut si elle n'est pas définie
                        autoFocus={action.autoFocus || false} // Utilisez l'autoFocus par défaut si elle n'est pas définie
                    >
                        {action.label}
                    </Button>
            ))}
        </DialogActions>
    </Dialog>
);

CustomDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            handler: PropTypes.func.isRequired,
            color: PropTypes.string,
            autoFocus: PropTypes.bool,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CustomDialog;
