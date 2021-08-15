import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProjectCard from '../components/ProjectCard';
import { fetchFavorites } from '../reducers/favoriteProjects';
import styles from '../stylesheets/Favorite.module.scss';

const Favorites = (props) => {
  const { favoriteProjects, getFavorites } = props;

  console.log(favoriteProjects);
  useEffect(() => {
    getFavorites();
  }, []);

  const favoriteProjectsList = favoriteProjects.map((project) => <ProjectCard project={project} key={project.id} />);

  return (
    <section className={styles.mainSection}>
      {favoriteProjectsList}
    </section>
  );
};

const mapStateToProps = (state) => ({
  favoriteProjects: state.favoriteProjects,
});

const mapDispatchToProps = (dispatch) => ({
  getFavorites: () => {
    dispatch(fetchFavorites());
  },
});

const FavoritesConnected = connect(mapStateToProps, mapDispatchToProps)(Favorites);
export default FavoritesConnected;
