import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

// eslint-disable-next-line react/display-name
export const TextMaskCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(+237) 6 00 00 00 00"
      definitions={{
        '#': 237,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
