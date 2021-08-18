import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import backendAPI from '../core/services/api';
import Cloudinary from '../core/services/cloudinary';
import styles from '../stylesheets/CreateProject.module.scss';
import ImageUpload from './ImageUpload';
import Loader from './helpers/Loader';
import { handleErrors, clearInputs } from './helpers/createProjectHelpers';

const CreateProject = (props) => {
  const { generateName } = props;
  const [projectsParams, setProjectParams] = useState({});
  const [imageUpload, setImageUpload] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fields, setFields] = useState([]);

  const errorElement = useRef();

  useEffect(() => {
    generateName('Create Project');
  }, []);

  const handleChange = (e) => {
    setProjectParams({
      ...projectsParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const res = await backendAPI.createProject(projectsParams);
    return res;
  };

  const uploadImage = () => {
    if (!imageUpload) return;
    setLoading(true);
    Cloudinary.uploadImage(imageUpload).then((res) => {
      setProjectParams({
        ...projectsParams,
        image_path: res.data.secure_url,
      });
    });
  };

  useEffect(() => {
    if (projectsParams.image_path) {
      handleSubmit()
        .then((res) => {
          if (res.status === 200) {
            setProjectParams({});
            setSuccess(true);
            clearInputs(fields);
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
    }
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 5000);
    }
  }, [success]);

  const handleError = (e) => {
    e.preventDefault();
    setFields(e.target.childNodes);
    if (!projectsParams.title || !imageUpload) {
      handleErrors(projectsParams, imageUpload, setErrors.bind(setErrors));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return null;
    }
    uploadImage(e);
  };

  return (
    <section className={styles.mainSection}>
      <div className={styles.loading} />
      <div className={`${(success && styles.showSuccess) || ''} ${styles.success}`}><h4>Project created Successfully</h4></div>
      <ul ref={errorElement} className={styles.errorsList}>
        {errors.title && (
        <li className="errorText">
          {errors.title}
        </li>
        )}
        {errors.image && (
        <li className="errorText">
          {errors.image}
        </li>
        )}
      </ul>
      <form onSubmit={handleError}>
        <input onChange={handleChange} type="text" name="title" className={styles.textInput} placeholder="Project Title" />
        <ImageUpload setImageUpload={setImageUpload} styles={styles} />
        <input name="github_url" onChange={handleChange} type="text" placeholder="Github URL (Optional)" className={styles.textInput} />
        <input name="live_demo" onChange={handleChange} type="text" placeholder="Live Demo (Optional)" className={styles.textInput} />
        <textarea name="description" onChange={handleChange} id="" cols="30" rows="10" placeholder="Describe your project" />
        <button type="submit" className={styles.publishButton}>
          {(loading && <Loader loading={loading} />) || 'Publish'}
        </button>
      </form>
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
