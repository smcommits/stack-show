import React, { useState, useRef } from 'react';
import backendAPI from '../core/services/api';
import Cloudinary from '../core/services/cloudinary';
import styles from '../stylesheets/CreateProject.module.scss';
import ImageUpload from './ImageUpload';

const CreateProject = (props) => {
  const [projectsParams, setProjectParams] = useState({});
  const [imageUpload, setImageUpload] = useState('');

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

//  <form onSubmit={handleSubmit}>
// <input onChange={handleChange} placeholder="title" type="text" name="title" />
// <input onChange={handleChange} placeholder="description" type="text" name="description" />
// <input onChange={handleChange} placeholder="github_url" type="text" name="github_url" />
// <input onChange={handleChange} placeholder="live_demo" type="text" name="live_demo" />
// {previewImage && <img src={previewImage} width="100%" />}
// <input onChange={handleFile} type="file" accept="image" />
// <input type="submit" />
// </form>

// <button onClick={handleSignature}>Testing</button>;

export default CreateProject;
