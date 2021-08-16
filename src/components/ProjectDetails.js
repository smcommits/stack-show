import React, { useState, useEffect } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';
import styles from '../stylesheets/ProjectDetail.module.scss';
import Rating from './Rating';
import { fetchProjectDetails } from '../reducers/projectDetails';
import BackendAPI from '../core/services/api';

const ProjectDetail = (props) => {
  const { project, id, getProjectDetail } = props;
  const {
    title,
    image_path: imagePath,
    stack_list: stackList,
    user,
    average_rating: averageRating,
    description,
    is_favorite: isFavorite,
    favorite_id: favID,
  } = project.details || {};

  const [isReadMore, setIsReadMore] = useState(true);
  const [favorite, setFavorite] = useState(isFavorite);
  const [favoriteId, setFavoriteId] = useState(favID);

  useEffect(() => {
    getProjectDetail(id);
  }, [id]);

  useEffect(() => {
    setFavoriteId(favID);
  }, [favID]);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleFavorite = async () => {
    setFavorite(!favorite);

    if (favorite) {
      const res = await BackendAPI.unFavoriteProject(favoriteId);
    } else {
      const res = await BackendAPI.favoriteProject(id);
      if (res.status === 200) {
        setFavoriteId(res.data.id);
      }
    }
  };

  // const stackListElements = stackList.map((stack) => <li key={Math.random()}>{stack}</li>);
  return (
    <section className={styles.main}>
      {project.details && (

      <section className={styles.projectSection}>
        <div className={styles.projectImage}>
          <figure className={styles.projectImageContainer}>
            <Image cloudName="dfsniizqr" publicId={imagePath}>
              <Transformation gravity="north" height="1920" width="1080" crop="fill" />
            </Image>
          </figure>
          <div className={styles.imageOverlay}>
            <figure>
              <img src={user.avatarPath || '/profile.png'} alt="user" />
            </figure>
            <div className={styles.overlayText}>
              <strong>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</strong>
              <Rating score={averageRating} />
            </div>
          </div>
        </div>

        <div className={styles.projectDetails}>
          <div className={styles.description}>
            <div className={styles.header}>
              <h4>About this project</h4>
              <div>
                <span>Favourite This</span>
                <i className={favorite ? `las la-heart ${styles.orange}` : 'lar la-heart'} onClick={handleFavorite} />
              </div>
            </div>
            <p className={styles.descriptionText}>
              {isReadMore ? `${description.slice(0, 200)}...` : description}
            </p>
            <button type="button" onClick={toggleReadMore} className={styles.showMoreButton}>
              {isReadMore ? <i className="las la-angle-down" /> : <i className="las la-angle-up" />}
            </button>
          </div>

        </div>

        <button className={styles.callToAction}>Take me to Project</button>
      </section>
      )}
    </section>

  );
};

const mapStateToProps = (state) => ({
  project: state.project,
});

const mapDispatchToProps = (dispatch) => ({
  getProjectDetail: (id) => {
    dispatch(fetchProjectDetails(id));
  },
});

const ProjectDetailConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

export default ProjectDetailConnected;
