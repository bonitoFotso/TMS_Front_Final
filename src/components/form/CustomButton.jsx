import { useState } from 'react';
import PropTypes from "prop-types"

import MuiAlert from '@mui/material/Alert';
import { Button, Snackbar } from '@mui/material';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomButton = ({ onClick, disabled, email, password }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleButtonClick = () => {
        if (!email || !password) {
            // Afficher un pop-up si les champs ne sont pas valides
            setOpenSnackbar(true);
        } else {
            // Appeler la fonction fournie par la prop onClick si les champs sont valides
            onClick();
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleButtonClick}
                disabled={disabled}
            >
                Login
            </Button>

            {/* Snackbar pour afficher le message d'erreur */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Veuillez remplir tous les champs.
                </Alert>
            </Snackbar>
        </>
    );
};

CustomButton.propTypes = {
  disabled: PropTypes.any,
  email: PropTypes.any,
  onClick: PropTypes.func,
  password: PropTypes.any
}

export default CustomButton;
