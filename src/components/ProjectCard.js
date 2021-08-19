import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import styles from '../stylesheets/ProjectCard.module.scss';
import Rating from './Rating';

const ProjectCard = (props) => {
  const { project, reference } = props;
  const {
    title,
    image_path: imagePath,
    stack_list: stackList,
    user,
    average_rating: averageRating,
    id,
  } = project;

  const ref = reference || null;

  const isLarge = useMediaQuery({
    query: '(min-width: 968px)',
  });

  const projectLink = `/project/${id}`;

  const stackListElements = stackList.map((stack) => <li key={Math.random()}>{stack}</li>);
  return (
    <div className={styles.projectCard} ref={ref}>
      <Link to={projectLink}>
        <figure>
          <Image cloudName="dfsniizqr" publicId={imagePath}>
            <Transformation gravity="north" height={isLarge ? '1500' : '500'} width={isLarge ? '1080' : '400'} crop="fill" />
          </Image>
        </figure>
      </Link>
      <div className={styles.projectDetails}>
        <div className={styles.leftDetails}>
          <Link to={projectLink}><strong>{title}</strong></Link>
          <ul className={styles.stackList}>
            {stackListElements}
          </ul>
        </div>
        <div className={styles.rightDetails}>
          <Rating score={averageRating} />
          <span>
            By:
            {user.name}
          </span>
        </div>

      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.instanceOf(Object).isRequired,
  reference: PropTypes.instanceOf(Object).isRequired,
};
export default ProjectCard;
