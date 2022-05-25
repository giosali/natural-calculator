import React from 'react';

import PropTypes from 'prop-types';

import '../stylesheets/ToasterNotification.css';

function ToasterNotification({ message }) {
  return (
    <div className="ToasterNotification">
      <div>&#9989;</div>
      <p>{message}</p>
    </div>
  );
}
ToasterNotification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ToasterNotification;
