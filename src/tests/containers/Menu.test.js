import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '../utils';
import Menu from '../../containers/Menu';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Menu
        updateImage={jest.fn()}
        menuHandler={jest.fn()}
        open
        logOut={jest.fn()}
      />
    </BrowserRouter>,
    {
      currentUser: {
        name: 'Test user',
        id: 1,
      },
    },
  );
});

it('should display the user info', () => {
  expect(screen.getByText('Test user')).toBeInTheDocument;
});

it('should render the menu with list of navigation items', () => {
  expect(screen.getByText('Home')).toBeInTheDocument;
  expect(screen.getByText('Create Project')).toBeInTheDocument;
  expect(screen.getByText('Conversations')).toBeInTheDocument;
  expect(screen.getByText('Logout')).toBeInTheDocument;

});
