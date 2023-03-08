import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, screen } from '../utils';
import Favorites from '../../components/favorite';
import { BackendAPI } from '../../services';

const favoriteProjects = {
  data: [
    {
      id: 1,
      title: 'Project 1',
      stack_list: ['Stack 1', 'Stack 2', 'Stack3'],
      average_rating: 4,
      user: {
        name: 'Test User',
      },
    },
  ],
};
beforeEach(() => {
  const mockFavoriteProjectService = jest.spyOn(BackendAPI, 'favoriteProjects');
  mockFavoriteProjectService.mockResolvedValue(favoriteProjects);
});

test('it renders the Favorite Project for users', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>,
    );
  });
  const { title } = favoriteProjects.data[0];

  return expect(screen.getByText(title)).toBeInTheDocument;
});
