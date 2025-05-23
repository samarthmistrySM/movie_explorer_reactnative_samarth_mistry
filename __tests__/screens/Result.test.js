import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Result from '../../src/screens/Result';
import { NavigationContainer } from '@react-navigation/native';
import * as movieApi from "../../src/api/movieApi";

const mockGoBack = jest.fn();
const mockUseRoute = jest.fn();

jest.mock('@react-navigation/native', () => {
  const nav = jest.requireActual('@react-navigation/native');
  return {
    ...nav,
    useRoute: () => mockUseRoute(),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('Result', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Result screen with correct search text', () => {
    mockUseRoute.mockReturnValue({
      params: { filter: { query: 'Action', type: 'title' } }
    });

    const { getByText } = render(
      <NavigationContainer>
        <Result />
      </NavigationContainer>
    );

    expect(getByText('Search results for "Action"')).toBeTruthy();
  });

  it('navigates to previous screen when go back button is pressed', () => {
    mockUseRoute.mockReturnValue({
      params: { filter: { query: 'Action', type: 'title' } }
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <Result />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId('goBackBtn'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("calls searchMovies and sets movies when filter.type is 'title'", async () => {
    mockUseRoute.mockReturnValue({
      params: { filter: { query: 'Spider', type: 'title' } }
    });

    const moviesResult = { movies: [{ id: 1, title: "Spider Movie" }] };
    jest.spyOn(movieApi, "searchMovies").mockResolvedValueOnce(moviesResult);

    const { getByText } = render(
      <NavigationContainer>
        <Result />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(movieApi.searchMovies).toHaveBeenCalledWith("Spider");
      expect(getByText("Spider Movie")).toBeTruthy();
    });
  });

  it("calls filterMovies and sets movies when filter.type is 'genre'", async () => {
    mockUseRoute.mockReturnValue({
      params: { filter: { query: 'Action', type: 'genre' } }
    });

    const moviesResult = { movies: [{ id: 2, title: "Action Movie" }] };
    jest.spyOn(movieApi, "filterMovies").mockResolvedValueOnce(moviesResult);

    const { getByText } = render(
      <NavigationContainer>
        <Result />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(movieApi.filterMovies).toHaveBeenCalledWith("Action");
      expect(getByText("Action Movie")).toBeTruthy();
    });
  });

  it("shows No result found when movies list is empty", async () => {
    mockUseRoute.mockReturnValue({
      params: { filter: { query: 'Nothing', type: 'title' } }
    });

    jest.spyOn(movieApi, "searchMovies").mockResolvedValueOnce({ movies: [] });

    const { getByText } = render(
      <NavigationContainer>
        <Result />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText("No result found")).toBeTruthy();
    });
  });
});