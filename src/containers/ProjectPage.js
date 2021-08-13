import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetails';

const ProjectPage = (props) => {
  const { id } = useParams();
  return (
    <ProjectDetail id={id} />
  );
};

export default ProjectPage;
