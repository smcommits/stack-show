import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CreateProject from '../components/CreateProject';
import BackendAPI from '../core/services/api';
import { fetchProjects } from '../reducers/project';
import ProjectCard from '../components/ProjectCard';
import styles from '../stylesheets/HomePage.module.scss';

const HomePage = (props) => {
  const { projects, getProjects, generateName } = props;

  useEffect(() => {
    getProjects();
    generateName('Homepage');
  }, []);

  const projectList = projects.map((project) => <ProjectCard project={project} key={project.id} />);
  return (
    <>

      <section className={styles.projectSection}>
        {projectList}
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  getProjects: () => {
    dispatch(fetchProjects());
  },
  generateName: (name) => {
    dispatch({ type: 'COMPONENT_NAME', payload: name });
  },
});

const HomePageConnected = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default HomePageConnected;
