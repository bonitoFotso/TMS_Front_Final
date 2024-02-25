import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

import { formatDate } from 'src/sections/test/components/date/format-date';

import TechAvatar from './TechAvatar';
import TaskDialog from './TaskDialog';



export default function TaskCard({ task }) {
  const [onOpen, setOnOpen] = useState(false);

  const handleOpen = () => {
    setOnOpen(true);
  };

  const handleClose = () => {
    setOnOpen(false);
  };

  const {
    name,
    status,
    priorite,
    description,
    date_debut,
    // date_fin,
    duree_estimee,
    // duree_reelle,
    createdAt,
    appelant,
    assignations
  } = task;
  // console.log(appelant.agence);

  const renderAvatar = (
    <TechAvatar techs={assignations} />
  );

  const renderTitle = (
    <Link
      color="primary"
      variant="subtitle2"
      underline="hover"
      
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {name}
    </Link>
  );

  const renderInfo = (
    <Stack
      direction="column"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.primary', // Utilisation de text.secondary pour une meilleure lisibilité
      }}
    >
      {[
        { number: appelant.phone, icon: 'eva:phone-fill' },
        { number: appelant.email, icon: 'eva:email-fill' },
        { number: appelant.agence.n_agence, icon: 'eva:keypad-fill' },
        { number: appelant.agence.siege.maintenance ? 'Maintenance' : 'Non Maintenance', icon: 'ic:baseline-build',
        },
      ].map((info, i) => (
        <Stack key={i} direction="row" alignItems="center">
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{info.number}</Typography>
        </Stack>
      ))}
    </Stack>
  );
  

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
        display: 'block',
      }}
    />
  );

  return (
    <Grid xs={12} sm={6} md={3}>
      <Card>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 1 / 4)',
          }}
        >
          {renderShape}
          {renderAvatar}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
          }}
        >
          {renderDate}
          <Button variant="subtitle2" underline="hover" onClick={handleOpen}>
            {renderTitle}
          </Button>
          {renderInfo}
          {/* Additional task-specific information */}
          <Typography variant="body2" color="text.primary">
            Status: {status}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Priority: {priorite}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Description: {description}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Start Date: {formatDate(date_debut)}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Estimated Duration: {duree_estimee}
          </Typography>
        </Box>
        {onOpen && (
          <TaskDialog task={task} onOpen={onOpen} onClose={handleClose} />
        )}
      </Card>
    </Grid>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
