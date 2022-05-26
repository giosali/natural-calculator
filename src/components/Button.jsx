import React from 'react';

import PropTypes from 'prop-types';

import '../stylesheets/Button.css';

function Button({ content, onClick }) {
  return (
    <button
      className="Button"
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
}
Button.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
