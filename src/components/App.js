import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { validateUser } from '../reducers/sessionReducer';

import AuthFormContainer from './authentication/AuthFromContainer';
import HomePage from '../containers/HomePage';
import Loader from './Loader';
import Nav from './Nav';
import ProjectPage from '../containers/ProjectPage';
import Favorites from '../containers/Favorites';
import CreateProject from './CreateProject';
import Conversations from   '../components/Conversations/Conversations'

const App = (props) => {
  const { currentUser, loading, performUserValidation } = props;

  useEffect(() => {
    performUserValidation();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          {loading && <Loader />}
          {!currentUser && <AuthFormContainer />}
          {!loading && (
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

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
