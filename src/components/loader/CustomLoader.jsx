import { Box, Typography, CircularProgress } from '@mui/material';

const CustomLoader = () => (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress color="primary" size={50} />
            <Typography variant="body1" color="textSecondary" mt={2}>
                Chargement des données...
            </Typography>
        </Box>
    );

export default CustomLoader;
