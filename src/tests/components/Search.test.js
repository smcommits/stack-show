import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Search from '../../components/helpers/search/Search';
import BackendAPI from '../../core/services/api';

const searchResponse = {
  data: [
    {
      id: 1,
      title: 'Project 1',
    }, {
      id: 2,
      title: 'Project 2',
    }, {
      id: 3,
      title: 'Project 3',
    }, {
      id: 4,
      title: 'Project 4',
    }, {
      id: 5,
      title: 'Project 5',
    }, {
      id: 6,
      title: 'Project 6',
    }, {
      id: 7,
      title: 'Project 7',
    }, {
      id: 8,
      title: 'Project 8',
    }, {
      id: 9,
      title: 'Project 9',
    }, {
      id: 10,
      title: 'Project 10',
    }, {
      id: 11,
      title: 'Project 11',
    }, {
      id: 12,
      title: 'Project 12',
    },
  ],
};
beforeEach(() => {
  const mockFetchSearch = jest.spyOn(BackendAPI, 'searchProject');
  mockFetchSearch.mockResolvedValue(searchResponse);
});

test('should render search list with first 10 items in response', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );
  });

  const searchTrigger = screen.getByTestId('search-trigger');
  userEvent.click(searchTrigger);

  const tenthSearchItem = screen.getByText('Project 10');
  expect(tenthSearchItem).toBeInTheDocument;

  const eleventhSearchItem = screen.queryByText('Project 11');
  expect(eleventhSearchItem).not.toBeInTheDocument;
});

test('it should close the search if the close button is clicked', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );
  });

  const searchTrigger = screen.getByTestId('search-trigger');
  userEvent.click(searchTrigger);

  expect(screen.findByText('Project 1')).toBeInTheDocument;

  userEvent.click(searchTrigger);

  expect(screen.queryByText('Project 1')).not.toBeInTheDocument;
});

