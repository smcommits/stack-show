const loaderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'START_COMPONENT_LOADING':
      return {
        ...state.componentLoading,
        [action.payload]: true,
      };
    case 'STOP_COMPONENT_LOADING':
      return {
        ...state.componentLoading,
        [action.payload]: false,
      };
    default:
      return state;
  }
};

export default loaderReducer;
