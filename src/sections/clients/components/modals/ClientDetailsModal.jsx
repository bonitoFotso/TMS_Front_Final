import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';

import CustomDialog from 'src/components/modal/CustomDialog'; // Assurez-vous de mettre le chemin correct vers votre composant CustomDialog

import ClientTabs from '../tabs/ClientTabs';

export default function ClientDetailsModal({ open, onClose, client }) {

    if (!client) {
        return null; // Retourne null si client est null
    }

    const { name } = client;



    // const handleDetailsClient = () => 
    //     // Logique pour gérer le clic sur le bouton Details
    //      <Navigate to={`/client-details/${id}`} />
    // ;

    // Définition des actions de dialogue
    const dialogActions = [
        // { label: 'Details', handler: handleDetailsClient, color: 'primary', condition: dellButton },
        { label: 'Close', handler: onClose, color: 'primary', },
    ];

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            title={`${name} Details`}
            actions={dialogActions}
        >
            {/* Passer setShowAdditionalButton à ClientTabs */}
            <ClientTabs client={client} onClose={onClose} />
        </CustomDialog>
    );
}

ClientDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    client: PropTypes.object,
};
