import { ITraditions } from '../../types/data.types';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Traditions from '../Traditions';
import { configureStore } from '@reduxjs/toolkit';
import renderer from 'react-test-renderer';

describe('<Traditions />', () => {
  it('renders correctly', () => {
    // Mock data
    const mockTraditions: ITraditions = {
      short: [
        { id: '1', tradition: 'Short tradition 1' },
        { id: '2', tradition: 'Short tradition 2' }
      ],
      long: [
        { id: '3', tradition: 'Long tradition 1' },
        { id: '4', tradition: 'Long tradition 2' }
      ]
    };

    // Create mock store with initial state including mock traditions data
    const store = configureStore({
      reducer: () => ({ data: { traditions: mockTraditions } })
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <Traditions />
          </NavigationContainer>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
