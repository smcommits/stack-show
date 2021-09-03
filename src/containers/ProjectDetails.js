import React, { useState, useEffect } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';
import { Cloudinary } from 'cloudinary-core';
import PropTypes from 'prop-types';
import styles from '../stylesheets/ProjectDetail.module.scss';
import Rating from '../components/Rating';
import { fetchProjectDetails } from '../reducers/projectDetails';
import BackendAPI from '../core/services/api';
import Loader from '../components/helpers/Loader';

const ProjectDetail = (props) => {
  const {
    project, id, getProjectDetail, loading, hideLoader,
  } = props;
  const {
    image_path: imagePath,
    user,
    average_rating: averageRating,
    description,
    is_favorite: isFavorite,
    favorite_id: favID,
  } = project.details || {};

  const [isReadMore, setIsReadMore] = useState(true);
  const [favorite, setFavorite] = useState(isFavorite);
  const [favoriteId, setFavoriteId] = useState(favID);
  const cloudinaryCore = new Cloudinary({ cloud_name: 'dfsniizqr' });

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
      BackendAPI.unFavoriteProject(favoriteId);
    } else {
      const res = await BackendAPI.favoriteProject(id);
      if (res.status === 200) {
        setFavoriteId(res.data.id);
      }
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <section className={styles.main}>
        {project.details && (

        <section className={styles.projectSection}>
          <div className={styles.projectImage}>
            <figure className={styles.projectImageContainer}>
              <img src={cloudinaryCore.url(imagePath)} onLoad={() => hideLoader()} alt="project" />
            </figure>
            <div className={styles.imageOverlay}>
              <figure>
                <Image cloudName="dfsniizqr" publicId={user.image}>
                  <Transformation gravity="face" height="100" width="100" crop="fill" />
                </Image>
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
                  <i className={favorite ? `las la-heart interactive ${styles.orange}` : 'lar la-heart interactive'} onClick={handleFavorite} role="presentation" />
                </div>
              </div>
              <p className={styles.descriptionText}>
                {isReadMore && description ? `${description.slice(0, 200)}...` : description}
              </p>
              <button type="button" onClick={toggleReadMore} className={styles.showMoreButton}>
                {isReadMore ? <i className="las la-angle-down" /> : <i className="las la-angle-up" />}
              </button>
            </div>

          </div>

          <button className={styles.callToAction} type="button">Take me to Project</button>
        </section>
        )}
      </section>
    </>
  );
};

ProjectDetail.propTypes = {
  project: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  getProjectDetail: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hideLoader: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getProjectDetail: async (id) => {
    dispatch(fetchProjectDetails(id));
  },
  hideLoader: () => {
    dispatch({ type: 'HIDE_LOADER' });
  },
});

const ProjectDetailConnected = connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

export default ProjectDetailConnected;
