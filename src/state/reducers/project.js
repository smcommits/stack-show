/* eslint-disable no-unused-vars */

const projectReducer = (state = { projects: [], pages: 0 }, action) => {
  switch (action.type) {
    case ('FETCH_PROJECTS'):
      return {
        projects: [...state.projects, ...action.payload.data],
        pages: action.payload.meta.pages,
      };
    default:
      return state;
  }
};

export default projectReducer;
