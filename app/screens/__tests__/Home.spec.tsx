import Home from '../Home';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import React from 'react';
import { makeStore } from '../../redux/store';
import { render } from '@testing-library/react-native';
import dataSlice, { setData } from '../../redux/slices/dataSlice';

describe('<Home />', () => {
  it('renders correctly with data', () => {
    // Create test store and data
    const store = makeStore();

    jest.mock('data');

    render(
      <Provider store={store}>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </Provider>
    );

  });
});
