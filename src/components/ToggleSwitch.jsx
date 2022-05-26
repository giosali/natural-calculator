import React, { useState } from 'react';

import PropTypes from 'prop-types';

import '../stylesheets/ToggleSwitch.css';

function ToggleSwitch({ states, isToggled, onToggle }) {
  const [on, off] = states;

  const [isOn, setIsOn] = useState(isToggled);
  const handleClick = () => {
    onToggle();
    setIsOn(!isOn);
  };

  return (
    <button
      aria-label={isOn ? on : off}
      className={`ToggleSwitch ${isOn ? 'ToggleSwitch--toggleon' : 'ToggleSwitch--toggleoff'}`}
      onClick={handleClick}
      type="button"
    >
      <span className={`ToggleSwitch__switch ${isOn ? 'ToggleSwitch__switch--toggleon' : 'ToggleSwitch__switch--toggleoff'}`} />
      <span>{on}</span>
      <span>{off}</span>
    </button>
  );
}
ToggleSwitch.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleSwitch;
