import React from 'react';
import PropTypes from 'prop-types';

const Rating = (props) => {
  const { score } = props;
  const starColor = (index) => (index + 1 <= score ? '#ffbe58' : '#dddddd');

  const stars = [...Array(5)].map((_item, index) => <i className="las la-star" key={Math.random()} style={{ color: starColor(index) }} />);

  return (
    <div>
      {stars}
    </div>
  );
};

Rating.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Rating;
