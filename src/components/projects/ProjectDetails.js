import React, { useState, useEffect } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { useDispatch, useSelector } from 'react-redux';
import { Cloudinary } from 'cloudinary-core';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import styles from '../../stylesheets/ProjectDetail.module.scss';
import { Rating, Loader, withAuth } from '../common';
import { fetchProjectDetails } from '../../state/actions';
import BackendAPI from '../../services/services/api';

const ProjectDetail = (props) => {
  const {
    id, authenticated,
  } = props;
  const project = useSelector((state) => state.project);
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
  const loading = useSelector((state) => state.componentLoading.projectPage);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjectDetails(id));
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
    if (!authenticated) {
      props.history.push('/login');
      return null;
    }
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
      {loading ? (
        <Rings
          height="80"
          width="80"
          color="#000"
          radius="6"
          visible
          ariaLabel="rings-loading"
          wrapperClass={styles.loaderWrapper}
        />
      ) : (
        <section className={styles.main}>
          {project.details && (

          <section className={styles.projectSection}>
            <div className={styles.projectImage}>
              <figure className={styles.projectImageContainer}>
                <img src={cloudinaryCore.url(imagePath)} alt="project" />
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
      )}
    </>
  );
};
export default withRouter(withAuth(ProjectDetail));
