import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '../utils';
import Message from '../../containers/Message';

const conversation = {
  id: 1,
  messages: [
    {
      id: 1,
      conversation_id: 1,
      text: 'Hey',
    },
    {
      id: 2,
      conversation_id: 1,
      text: 'How are you?',
    },
  ],
  users: [
    {
      id: 2,
      name: 'Sender User',
    },
    {
      id: 1,
      name: 'Reciever User',
    },
  ],
};

jest.spyOn(React, 'useRef').mockReturnValue({
  current: <li />,
});
beforeEach(() => {
  render(
    <BrowserRouter>
      <Message
        conversation={conversation}
        styles={{}}
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
