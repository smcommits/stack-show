import React from 'react';

const Rating = (props) => {
  const { score } = props;
  const starColor = (index) => (index + 1 <= score ? '#ffbe58' : '#dddddd');

  const stars = [...Array(5)].map((item, index) => <i className="las la-star" key={index} style={{ color: starColor(index) }} />);

  return (
    <div>
      {stars}
    </div>
  );
};

export default Rating;
