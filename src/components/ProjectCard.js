import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/ProjectCard.module.scss';
import Rating from './Rating';

const ProjectCard = (props) => {
  const { project } = props;
  const {
    title,
    image_path: imagePath,
    stack_list: stackList,
    user,
    average_rating: averageRating,
    id,
  } = project;

  console.log(project)
  const projectLink = `/project/${id}`;

  const stackListElements = stackList.map((stack) => <li key={Math.random()}>{stack}</li>);
  return (
    <div className={styles.projectCard}>
      <Link to={projectLink}>
        <figure>
          <Image cloudName="dfsniizqr" publicId={imagePath}>
            <Transformation gravity="north" height="500" width="400" crop="fill" />
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

export default ProjectCard;
