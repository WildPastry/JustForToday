import { IStep } from '../../types/data.types';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Steps from '../Steps';
import { configureStore } from '@reduxjs/toolkit';
import renderer from 'react-test-renderer';

describe('<Steps />', () => {
  it('renders correctly', () => {
    // Mock data
    const mockSteps: IStep[] = [
      { id: '1', step: 'Step 1' },
      { id: '2', step: 'Step 2' }
    ];

    // Create mock store with initial state including mock steps data
    const store = configureStore({
      reducer: () => ({ data: { steps: mockSteps } })
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <Steps />
          </NavigationContainer>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
