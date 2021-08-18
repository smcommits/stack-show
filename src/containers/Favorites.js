import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProjectCard from '../components/ProjectCard';
import { fetchFavorites } from '../reducers/favoriteProjects';
import styles from '../stylesheets/Favorite.module.scss';

const Favorites = (props) => {
  const { favoriteProjects, getFavorites, generateName } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites();
    generateName('Favorites');
  }, []);

  const favoriteProjectsList = favoriteProjects.map((project) => <ProjectCard project={project} key={project.id} />);

  return (
    <section className={styles.mainSection}>
      {!favoriteProjects.length && <div className={styles.placeholderText}><h4>You have no favorite projects.</h4></div>}
      {favoriteProjectsList}
    </section>
  );
};

const mapStateToProps = (state) => ({
  favoriteProjects: state.favoriteProjects,
});

const mapDispatchToProps = (dispatch) => ({
  getFavorites: async () => {
    dispatch(fetchFavorites());
  },
  generateName: (name) => {
    dispatch({ type: 'COMPONENT_NAME', payload: name });
  },
});

const FavoritesConnected = connect(mapStateToProps, mapDispatchToProps)(Favorites);
export default FavoritesConnected;
