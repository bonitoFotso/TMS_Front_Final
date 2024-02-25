/* eslint-disable no-undef */
import PropTypes from "prop-types"

import { Card, Typography, CardContent } from '@mui/material';



const ProfileView = ({ user }) => (
        // eslint-disable-next-line no-undef
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" className={classes.title}>
                    Profile View
                </Typography>
                <Typography variant="body1" className={classes.info}>
                    Email: {user.email}
                </Typography>
                <Typography variant="body1" className={classes.info}>
                    Admin: {user.admin ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body1" className={classes.info}>
                    Helpdesk: {user.helpdesk ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body1" className={classes.info}>
                    Technicien: {user.tech ? 'Yes' : 'No'}
                </Typography>
            </CardContent>
        </Card>
    );

ProfileView.propTypes = {
  user: PropTypes.shape({
    admin: PropTypes.any,
    email: PropTypes.any,
    helpdesk: PropTypes.any,
    tech: PropTypes.any
  })
}

export default ProfileView;
