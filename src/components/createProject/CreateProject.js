import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Bars } from 'react-loader-spinner';
import { withAuth, Loader } from '../common';
import { BackendAPI, Cloudinary } from '../../services';
import styles from '../../stylesheets/CreateProject.module.scss';
import ImageUpload from './ImageUpload';
import {
  handleErrors,
  clearInputs,
} from '../helpers/createProjectHelpers';
import PleaseLogin from '../common/PleaseLogin';

const CreateProject = ({ authenticated }) => {
  if (!authenticated) {
    return <PleaseLogin text="Please login in to create a project." />;
  }
  const [projectsParams, setProjectParams] = useState({});
  const [imageUpload, setImageUpload] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fields, setFields] = useState([]);

  const errorElement = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'COMPONENT_NAME', payload: 'Create Project' });
  }, []);

  const handleChange = (e) => {
    setProjectParams({
      ...projectsParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const res = await BackendAPI.createProject(projectsParams);
    return res;
  };

  const uploadImage = () => {
    if (!imageUpload) return;
    setLoading(true);
    Cloudinary.uploadImage(imageUpload).then((res) => {
      setProjectParams({
        ...projectsParams,
        image_path: res.data.public_id,
      });
    });
  };

  useEffect(() => {
    if (projectsParams.image_path) {
      handleSubmit().then((res) => {
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
    setErrors({});
    return uploadImage(e);
  };

  return (
    <div>
      <section className={styles.mainSection}>
        <div className={styles.loading} />
        <div
          className={`${(success && styles.showSuccess) || ''} ${
            styles.success
          }`}
        >
          <h4>Project created Successfully</h4>
        </div>
        <ul ref={errorElement} className={styles.errorsList}>
          {errors.title && <li className="errorText">{errors.title}</li>}
          {errors.image && <li className="errorText">{errors.image}</li>}
        </ul>
        <form onSubmit={handleError}>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className={styles.textInput}
            placeholder="Project Title"
          />
          <ImageUpload setImageUpload={setImageUpload} styles={styles} />
          <input
            name="github_url"
            onChange={handleChange}
            type="text"
            placeholder="Github URL (Optional)"
            className={styles.textInput}
          />
          <input
            name="live_demo"
            onChange={handleChange}
            type="text"
            placeholder="Live Demo (Optional)"
            className={styles.textInput}
          />
          <textarea
            name="description"
            onChange={handleChange}
            id=""
            cols="30"
            rows="10"
            placeholder="Describe your project"
          />
          <button type="submit" className={styles.publishButton}>
            {loading ? (
              <Bars
                height="20"
                width="30"
                color="#f6f6f6"
                ariaLabel="bars-loading"
                wrapperStyle={{ justifyContent: 'center' }}
                visible
              />
            ) : 'Publish'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default withAuth(CreateProject);
