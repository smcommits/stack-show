import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CreateProject from '../components/CreateProject';
import BackendAPI from '../core/services/api';
import { fetchProjects } from '../reducers/project';
import ProjectCard from '../components/ProjectCard';
import styles from '../stylesheets/HomePage.module.scss';
import Search from '../components/Search';

const HomePage = (props) => {
  const { projects, getProjects } = props;

  console.log(projects);
  useEffect(() => {
    getProjects();
  }, []);

  const projectList = projects.map((project) => <ProjectCard project={project} key={project.id} />);
  return (
    <>
      <h1>HomePage</h1>

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
});

const HomePageConnected = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default HomePageConnected;
