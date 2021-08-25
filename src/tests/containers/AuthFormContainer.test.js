import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '../utils';
import AuthFormContainer from '../../containers/AuthFromContainer';
import Auth from '../../core/services/authentications';

beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthFormContainer />
    </BrowserRouter>,
  );
});
const user = {
  name: 'Test user',
  email: 'testuser@example.com',
  password: 'testuseruser',
  confirmPassword: 'testuseruser',
};

test('it renders the AuthForm component', () => {
  const welcomeText = screen.getByText('Hi, welcome to Stack Show. Please sign up to continue.');
  expect(welcomeText).toBeInTheDocument;
});

test('it validates user input', () => {
  const submitButton = screen.getByTestId('submit-button');
  userEvent.click(submitButton);

  expect('Please provide a user name.').toBeInTheDocument;
  expect('Please provide a correct email address.').toBeInTheDocument;
  expect('Password must have at least 8 characters.').toBeInTheDocument;
  expect("Password confirmation doesn't match.").toBeInTheDocument;
});

test('it should catch the error if something went wrong with the server', async () => {
  const mockSignUp = jest.spyOn(Auth, 'signUp');
  mockSignUp.mockResolvedValue({});

  const inputPlaceholders = ['username', 'email@example.com', 'password', 'confirm password'];

  const inputElements = inputPlaceholders.map(
    (placeholder) => screen.getByPlaceholderText(placeholder),
  );

  Object.keys(user).map((key, index) => {
    userEvent.type(inputElements[index], user[key]);
  });

  const submitButton = screen.getByTestId('submit-button');
  userEvent.click(submitButton);

  const error = await screen.findByText('Something went wrong');

  expect(screen.getByText('Something went wrong')).toBeInTheDocument;
});
