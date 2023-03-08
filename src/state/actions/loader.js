const loaderActions = {
  startLoading(component) {
    return { type: 'START_COMPONENT_LOADING', payload: component };
  },
  stopLoading(component) {
    return { type: 'STOP_COMPONENT_LOADING', payload: component };
  },

};

export default loaderActions;
