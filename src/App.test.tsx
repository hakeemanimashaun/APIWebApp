import {fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import * as apiHooks from './library/api_hooks';
import SearchComponent, * as search from './components/SearchComponent';
import { FetchState } from './Types';
import faker from 'faker';

describe('<App />', () => {
  const renderComponent = () => render(<SearchComponent />);

  const defaultText ='Hello there, input user login information and click the button below to get the list of user posts from the API.';
  const loadingText = 'Fetching posts...';
  const errorText = 'Oops! Something went wrong. Please try again.';
  const successText = "Here's the list of posts:";

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render default state', () => {
    renderComponent();

    const stateEl = screen.queryByText(defaultText);

    expect(stateEl).toBeInTheDocument();
  });


  it('should render loading state on loading', () => {
    const fetchState = FetchState.LOADING;

    jest
      .spyOn(apiHooks, 'useGetPosts')
      .mockReturnValue([[], fetchState, jest.fn()]);

    renderComponent();

    const stateEl = screen.queryByText(loadingText);

    expect(stateEl).toBeInTheDocument();
  });


  it('should render error state on error', () => {
    const fetchState = FetchState.ERROR;

    jest
      .spyOn(apiHooks, 'useGetPosts')
      .mockReturnValue([[], fetchState, jest.fn()]);

    renderComponent();

    const stateEl = screen.queryByText(errorText);

    expect(stateEl).toBeInTheDocument();
  });


  it('should render success state on success', () => {
    const fetchState = FetchState.SUCCESS;
    const posts = [
      {
        id: faker.datatype.number(),
       login: faker.lorem.sentence(),
       type: faker.lorem.sentence(),
        avatar_url: faker.lorem.sentence(),
      },
    ];

    jest
      .spyOn(apiHooks, 'useGetPosts')
      .mockReturnValue([posts, fetchState, jest.fn()]);

    renderComponent();

    const stateEl = screen.queryByText(successText);
    const post = posts[0];
    const postTitle = `${post.id} - ${post.login}`;
    const postEl = screen.queryByText(postTitle);

    expect(stateEl).toBeInTheDocument();
    expect(postEl).toBeInTheDocument();
  });

  it('should call API on button click', () => {
    const getPostsMock = jest.fn();

    jest
      .spyOn(apiHooks, 'useGetPosts')
      .mockReturnValue([[], FetchState.DEFAULT, getPostsMock]);

    renderComponent();

    const btnEl = screen.queryByText('Get Posts') as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(getPostsMock).toBeCalledTimes(1);
  });
});
