import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../stylesheets/Loader.module.scss';

const Loader = (props) => {
  const { loading, absoluteStyle, propStyles } = props;

  if (!loading) return null;

  const { width, height, margin } = propStyles || {};
  const dotStyle = {
    width: width || '1rem',
    height: height || '1rem',
    margin: margin || '0.8rem',

  };
  return (
    <div className={styles.loading} style={absoluteStyle || {}}>
      <div className={styles.dot} style={dotStyle} />
      <div className={styles.dot} style={dotStyle} />
      <div className={styles.dot} style={dotStyle} />
      <div className={styles.dot} style={dotStyle} />
      <div className={styles.dot} style={dotStyle} />
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  absoluteStyle: PropTypes.instanceOf(Object),
  propStyles: PropTypes.instanceOf(Object),
};

Loader.defaultProps = {
  propStyles: {},
};

Loader.defaultProps = {
  absoluteStyle: {},
};

export default Loader;
