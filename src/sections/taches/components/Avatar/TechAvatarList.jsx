import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup from '@mui/material/AvatarGroup';

const TechAvatarList = ({ techs, onTechClick }) => (
    <AvatarGroup max={4}>
      {techs.map((tech) => (
        <Tooltip key={tech.id} title={tech.name} arrow>
          <Avatar
            alt={tech.name}
            src={tech.photo}
            onClick={() => onTechClick(tech)}
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  );

TechAvatarList.propTypes = {
  techs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTechClick: PropTypes.func.isRequired,
};

export default TechAvatarList;
