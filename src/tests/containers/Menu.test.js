/* eslint-disable no-unused-expressions */

import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '../utils';
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
  expect(screen.findByText('Test user')).toBeInTheDocument;
});

describe('it should render the menu with list of navigation items', () => {
  const navLinks = [
    ['Home'],
    ['Create Project'],
    ['Conversations'],
    ['Logout'],
  ];
  test.each(navLinks)(
    'given %s navLink should be present in the document',
    (navLink) => {
      const text = screen.findByText(navLink);
      expect(text).toBeInTheDocument;
    },
  );
});
