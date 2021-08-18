const handleErrors = (projectsParams, imageUpload, setErrorCallback) => {
  if (!projectsParams.title && !imageUpload) {
    setErrorCallback({ title: 'Please provide a title', image: 'Please provide an image' });
  } else if (!projectsParams.title) {
    setErrorCallback({ title: 'Please provide a title' });
  } else {
    setErrorCallback({ image: 'Please provide a project image' });
  }
};

const clearInputs = (fields) => {
  fields.forEach((node) => { node.value = ''; });
};
export {
  handleErrors,
  clearInputs,
};
