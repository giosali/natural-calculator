import React from 'react';

import PropTypes from 'prop-types';

import '../stylesheets/Button.css';

function Button({ content, action }) {
  return (
    <button
      className="Button"
      onClick={action}
      type="button"
    >
      {content}
    </button>
  );
}
Button.propTypes = {
  content: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Button;
