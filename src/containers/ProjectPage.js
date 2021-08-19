import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from './ProjectDetails';

const ProjectPage = () => {
  const { id } = useParams();
  return (
    <ProjectDetail id={id} />
  );
};

export default ProjectPage;
