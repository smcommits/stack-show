import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rings } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { withAuth, ProjectCard } from '../common';
import { fetchFavorites, generateName } from '../../state/actions';
import styles from '../../stylesheets/Favorite.module.scss';
import PleaseLogin from '../common/PleaseLogin';

const Favorites = ({ authenticated }) => {
  if (!authenticated) return <PleaseLogin text="Please login to see your favorites." />;
  const dispatch = useDispatch();
  const favoriteProjects = useSelector((state) => state.favoriteProjects);
  const loading = useSelector((state) => state.componentLoading.favorites);
  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(generateName('Favorites'));
  }, []);

  const favoriteProjectsList = favoriteProjects.map(
    (project) => <ProjectCard project={project} key={project.id} />,
  );

  return (
    <div>
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
        <section className={styles.mainSection}>
          {!loading && !favoriteProjects.length
          && (
          <div className={styles.placeholderText}>
            <h4>You have no favorite projects.</h4>
          </div>
          )}
          {favoriteProjectsList}
        </section>
      )}
    </div>
  );
};
Favorites.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
export default withAuth(Favorites);
