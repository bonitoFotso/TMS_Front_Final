import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

export default function TechnicianCard({ technician }) {
  const {
    photo,
    name,
    prenom,
    createdAt,
    tel,
    email,
    matricule,
    vitesse_execution,
    efficacite,
  } = technician;


  const renderAvatar = (
    <Avatar
      alt={tel}
      src={photo}
      sx={{
        zIndex: 9,
        width:  32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
      }}
    />
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
      {prenom} {name}
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
        color: 'text.disabled',
      }}
    >
      {[
        { number: tel, icon: 'eva:phone-fill' },
        { number: email, icon: 'eva:email-fill' },
        { number: matricule, icon: 'eva:keypad-fill' },
        { number: vitesse_execution, icon: 'ic:baseline-speed' },
        { number: efficacite, icon: 'eva:percent-fill' },
      ].map((info, _index) => (
        <Stack key={_index} direction="row">
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{info.number}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderphoto = (
    <Box
      component="img"
      alt={prenom}
      src={photo}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
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
            pt: 'calc(100% * 3 / 4)',
          }}
        >
          {renderShape}
          {renderAvatar}
          {renderphoto}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
          }}
        >
          {renderDate}
          {renderTitle}
          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

TechnicianCard.propTypes = {
  technician: PropTypes.object.isRequired,
};
