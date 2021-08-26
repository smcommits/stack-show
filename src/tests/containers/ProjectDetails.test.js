import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import faker from 'faker';
import { render, screen } from '../utils';
import ProjectDetail from '../../containers/ProjectDetails';
import BackendAPI from '../../core/services/api';

const project = {
  data: {
    id: '1',
    title: 'Project 1',
    imagePath: 'asxdfhkdsl',
    stack_list: ['Stack 1', 'Stack 2', 'Stack3'],
    average_rating: 4,
    is_favorite: false,
    favorite_id: null,
    description: faker.lorem.sentences(50),
    user: {
      name: 'Test User',
    },
  },
};

beforeEach(async () => {
  const projectDetailService = jest.spyOn(BackendAPI, 'getProjectDetails');
  projectDetailService.mockResolvedValue(project);

  await act(async () => {
    render(
      <BrowserRouter>
        <ProjectDetail id={1} />
      </BrowserRouter>,
      {
        loading: false,
      },
    );
  });
});

it('should render all the project details', async () => {
  const username = await screen.findByText(project.data.user.name);
  const description = await screen.findByText(`${project.data.description.slice(0, 200)}...`);
  const callToAction = await screen.findByText('Take me to Project');
  expect(username).toBeInTheDocument;
  expect(description).toBeInTheDocument;
  expect(callToAction).toBeInTheDocument;
});

it('should show more of description when the expand button is clicked', async () => {
  const showMoreButton = screen.getAllByRole('button')[0];
  userEvent.click(showMoreButton);

  expect(screen.getByText(project.data.description)).toBeInTheDocument;
});

it('should collapse the description when the collapse button is clicked', async () => {
  const projectDetailService = jest.spyOn(BackendAPI, 'getProjectDetails');
  projectDetailService.mockResolvedValue(project);

  const showMoreButton = screen.getAllByRole('button')[0];
  const collapsedDescription = screen.getByText(`${project.data.description.slice(0, 200)}...`);
  const expandedDescription = screen.queryByText(project.data.description);
  userEvent.click(showMoreButton);

  expect(screen.getByText(project.data.description)).toBeInTheDocument;

  userEvent.click(showMoreButton);

  expect(collapsedDescription).toBeInTheDocument;
  expect(expandedDescription).not.toBeInTheDocument;
});

it('should call favorite project service when the favorite button is clicked', async () => {
  const createFavoriteService = jest.spyOn(BackendAPI, 'favoriteProject');
  createFavoriteService.mockResolvedValue({});
  const favoriteButton = screen.getAllByRole('presentation')[0];

  userEvent.click(favoriteButton);

  expect(createFavoriteService).toHaveBeenCalled();
});

it('should call unFavoriteProject service if the project is already favorite', async () => {
  project.data.is_favorite = true;
  const unfavoriteProjectService = jest.spyOn(BackendAPI, 'unFavoriteProject');
  unfavoriteProjectService.mockResolvedValue({});
  const favoriteButton = screen.getAllByRole('presentation')[0];

  userEvent.click(favoriteButton); // this will favorite it
  userEvent.click(favoriteButton);

  expect(unfavoriteProjectService).toHaveBeenCalled();
});
