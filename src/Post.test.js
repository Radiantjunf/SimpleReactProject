import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Post from './Post';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1'
  })
}));

describe('Post Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          userId: 1,
          id: 1,
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
        })
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('loads and displays the post', async () => {
    render(
      <Router>
        <ThemeProvider>
          <Post />
        </ThemeProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading')).toHaveTextContent('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
      expect(screen.getByText('quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto')).toBeInTheDocument();
    });
  });
});
