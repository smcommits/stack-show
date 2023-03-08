import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../utils';
import AuthFormContainer from '../../components/authentication';
import { Auth } from '../../services';

beforeEach(async () => {
  jest.spyOn(Auth, 'userValidation').mockResolvedValue({});
  jest.spyOn(Auth, 'signUp').mockResolvedValue({});

  await act(async () => {
    render(
      <BrowserRouter>
        <AuthFormContainer />
      </BrowserRouter>,
    );
  });
});
const user = {
  name: 'Test user',
  email: 'testuser@example.com',
  password: 'testuseruser',
  confirmPassword: 'testuseruser',
};

describe('it validates user input', () => {
  const cases = [
    ['Please provide a user name'],
    ['Please provide a correct email address'],
    ['Password must have at least 8 characters'],
    ["Password confirmation doesn't match"],
  ];

  test.each(cases)(
    'given %s string should be present',
    (string) => {
      const submitButton = screen.getByTestId('submit-button');
      userEvent.click(submitButton);
      const text = screen.findByText(string);
      return expect(text).toBeInTheDocument;
    },
  );
});

test('it renders the AuthForm component', () => {
  const welcomeText = screen.getByText('Hi, welcome to Stack Show. Please sign up to continue.');
  return expect(welcomeText).toBeInTheDocument;
});

test('it should catch the error if something went wrong with the server', async () => {
  const inputPlaceholders = ['username', 'email@example.com', 'password', 'confirm password'];

  const inputElements = inputPlaceholders.map(
    (placeholder) => screen.getByPlaceholderText(placeholder),
  );

  Object.keys(user).map((key, index) => userEvent.type(inputElements[index], user[key]));

  const submitButton = screen.getByTestId('submit-button');
  userEvent.click(submitButton);

  const error = await screen.findByText('Something went wrong');

  return expect(error).toBeInTheDocument;
});
