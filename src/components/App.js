import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthFormContainer from './authentication';
import HomePage from './homepage';
import Nav from './nav';
import ProjectPage from './projects';
import Favorites from './favorite';
import CreateProject from './createProject';
import Conversations from './conversation';
import { validateUser } from '../state/actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateUser());
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <>
            <Nav />
            <Route path="/" exact component={HomePage} />
            <Route path="/project/:id" component={ProjectPage} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/create" component={CreateProject} />
            <Route path="/conversations" component={Conversations} />
            <Route path="/login" component={AuthFormContainer} />
          </>
        </Switch>
      </Router>
    </>
  );
};

export default App;
