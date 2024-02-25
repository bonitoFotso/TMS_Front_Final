import PropTypes from "prop-types"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem, IconButton, Typography, ListItemText, ListItemSecondaryAction } from '@mui/material';

const ClientList = ({ clients, onDelete, onEdit }) => (
        <List>
            {clients.length > 0 ? (
                clients.map((client) => (
                    <ListItem key={client.id}>
                        <ListItemText
                            primary={client.name}
                            secondary={client.email}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => onEdit(client.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => onDelete(client.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary" align="center">
                    No clients available
                </Typography>
            )}
        </List>
    );

ClientList.propTypes = {
  clients: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
}

export default ClientList;
