import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import backendAPI from '../core/services/api';
import Cloudinary from '../core/services/cloudinary';
import styles from '../stylesheets/CreateProject.module.scss';
import ImageUpload from './ImageUpload';

const CreateProject = (props) => {
  const { generateName } = props;
  const [projectsParams, setProjectParams] = useState({});
  const [imageUpload, setImageUpload] = useState('');

  useEffect(() => {
    generateName('Create Project');
  }, []);
  const handleChange = (e) => {
    setProjectParams({
      ...projectsParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI.createProject(projectsParams)
      .then((res) => {
        console.log(res);
      });
  };

  const projectInput = () => {
    if (!imageUpload) return;

    Cloudinary.uploadImage(imageUpload).then((res) => {
      setProjectParams({
        ...projectsParams,
        image_path: res.data.secure_url,
      });
      console.log(res);
    });
  };

  return (
    <section className={styles.mainSection}>
      <input onChange={handleChange} type="text" name="title" className={styles.textInput} placeholder="Project Title" />
      <ImageUpload setImageUpload={setImageUpload} styles={styles} />
      <input name="github_url" onChange={handleChange} type="text" placeholder="Github URL (Optional)" className={styles.textInput} />
      <input name="live_demo" onChange={handleChange} type="text" placeholder="Live Demo (Optional)" className={styles.textInput} />
      <textarea name="description" onChange={handleChange} id="" cols="30" rows="10" placeholder="Describe your project" />
      <button onClick={projectInput} type="submit" className={styles.publishButton}>Publish</button>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  generateName: (name) => {
    dispatch({ type: 'COMPONENT_NAME', payload: name });
  },
});

const CreateProjectConnected = connect(null, mapDispatchToProps)(CreateProject);
export default CreateProjectConnected;
