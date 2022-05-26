import React from 'react';

import PropTypes from 'prop-types';

import '../stylesheets/Button.css';

function Button({ icon, title, onClick }) {
  return (
    <button
      className="Button"
      onClick={onClick}
      title={title}
      type="button"
    >
      <i className={`Button__icon ${icon}`} />
    </button>
  );
}
Button.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
