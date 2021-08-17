const currentComponent = (state = '', action) => {
  switch (action.type) {
    case ('COMPONENT_NAME'):
      return action.payload;
    default:
      return state;
  }
};

export default currentComponent;
