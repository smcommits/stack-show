import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { connect } from 'react-redux';
import CreateProject from '../components/CreateProject';
import BackendAPI from '../core/services/api';

import { fetchProjects } from '../reducers/project';
import ProjectCard from '../components/ProjectCard';
import styles from '../stylesheets/HomePage.module.scss';
import Loader from '../components/helpers/Loader';

const HomePage = (props) => {
  const {
    projects, getProjects, generateName, loading,
  } = props;

  const [page, setPage] = useState(2);

  console.log(page);
  const observer = useRef();

  useEffect(() => {
    if (Object.keys(projects).length) return null;
    getProjects(1);
    generateName('Homepage');
  }, []);

  const lastProjectElement = useCallback((element) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getProjects(page);
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (element) observer.current.observe(element);
  }, [projects]);

  const projectList = projects.map((project, index) => ((index + 1 === projects.length)
    ? <ProjectCard project={project} reference={lastProjectElement} key={project.id} />
    : <ProjectCard project={project} key={project.id} />));

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button className={styles.backToTop} onClick={handleTop}><i className="las la-angle-up" /></button>
      <div className={styles.loader}>
        <Loader loading={loading} />
      </div>
      <section className={styles.projectSection}>
        {projectList}
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getProjects: (page) => {
    dispatch(fetchProjects(page));
  },
  generateName: (name) => {
    dispatch({ type: 'COMPONENT_NAME', payload: name });
  },
});

const HomePageConnected = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default HomePageConnected;
