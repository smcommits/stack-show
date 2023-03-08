import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rings, ThreeDots } from 'react-loader-spinner';
import { fetchProjects, generateName } from '../../state/actions';
import { ProjectCard } from '../common';
import styles from '../../stylesheets/HomePage.module.scss';

const HomePage = () => {
  const projects = useSelector((state) => state.projects.projects);
  const totalPages = useSelector((state) => state.projects.pages);
  const loading = useSelector((state) => state.componentLoading.homepage);
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const observer = useRef();
  useEffect(() => {
    dispatch(generateName('HomePage'));
    if (projects.length) return null;
    dispatch(fetchProjects(1));
    return null;
  }, []);

  const lastProjectElement = useCallback((element) => {
    if (observer.current) observer.current.disconnect();
    // eslint-disable-next-line consistent-return
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page > totalPages) return null;
        dispatch(fetchProjects(page));
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
      {loading && !projects.length && (
        <Rings
          height="80"
          width="80"
          color="#000"
          radius="6"
          visible
          ariaLabel="rings-loading"
          wrapperClass={styles.loaderWrapper}
        />
      )}
      <button aria-label="backToTop" type="button" className={styles.backToTop} onClick={handleTop}><i className="las la-angle-up" /></button>
      <section className={styles.projectSection}>
        {projectList}
      </section>
      {loading && projects.length && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#000"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: 'center' }}
          wrapperClassName=""
          visible
        />
      )}
    </>
  );
};

export default HomePage;
