import React, { useState } from 'react';
import backendAPI from '../core/services/api';
import Cloudinary from '../core/services/cloudinary';

const CreateProject = (props) => {
  const [projectsParams, setProjectParams] = useState({});
  const [imageUpload, setImageUpload] = useState('');
  const [previewImage, setPreviewImage] = useState('');

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
  const handleFile = (event) => {
    setImageUpload(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSignature = () => {
    if (!imageUpload) return;

    // const formData = new FormData();
    // formData.append('file', imageUpload);
    // formData.append('upload_preset', 'yrb8eetp');

    Cloudinary.uploadImage(imageUpload).then((res) => {
      setProjectParams({
        ...projectsParams,
        image_url: res.data.secure_url,
      });
      console.log(res);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} placeholder="title" type="text" name="title" />
        <input onChange={handleChange} placeholder="description" type="text" name="description" />
        <input onChange={handleChange} placeholder="github_url" type="text" name="github_url" />
        <input onChange={handleChange} placeholder="live_demo" type="text" name="live_demo" />
        {previewImage && <img src={previewImage} width="100%" />}
        <input onChange={handleFile} type="file" accept="image" />
        <input type="submit" />
      </form>

      <button onClick={handleSignature}>Testing</button>
    </>
  );
};

export default CreateProject;
