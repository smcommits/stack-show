import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { validateUser } from '../reducers/sessionReducer';

import AuthFormContainer from './AuthFromContainer';
import HomePage from './HomePage';
import Nav from './Nav';
import ProjectPage from './ProjectPage';
import Favorites from './Favorites';
import CreateProject from './CreateProject';
import Conversations from './Conversations';

const App = (props) => {
  const { currentUser, performUserValidation } = props;

  useEffect(() => {
    performUserValidation();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          {!currentUser && <AuthFormContainer />}
          {currentUser && (
          <>
            <Nav currentUser={currentUser} />
            <Route path="/" exact component={HomePage} />
            <Route path="/project/:id" component={ProjectPage} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/create" component={CreateProject} />
            <Route path="/conversations" component={Conversations} />
          </>
          )}
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  performUserValidation: () => {
    dispatch(validateUser());
  },
});

App.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
  performUserValidation: PropTypes.func.isRequired,
};

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
