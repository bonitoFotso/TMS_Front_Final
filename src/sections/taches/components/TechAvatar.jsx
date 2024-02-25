import { useState } from 'react';
import PropTypes from 'prop-types';

import TechAvatarList from  './Avatar/TechAvatarList';
import TechAvatarModal from './Avatar/TechAvatarModal';

const TechAvatar = ({ techs }) => {
  const [selectedTech, setSelectedTech] = useState(null);

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
  };

  const handleCloseModal = () => {
    setSelectedTech(null);
  };

  return (
    <>
      <TechAvatarList techs={techs} onTechClick={handleTechClick} />
      <TechAvatarModal
        selectedTech={selectedTech}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};

TechAvatar.propTypes = {
  techs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TechAvatar;
