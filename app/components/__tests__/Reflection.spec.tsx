import { Provider } from 'react-redux';
import Reflection from '../Reflection';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Reflection />', () => {
  it('renders correctly', () => {
    const store = makeStore();

    const mockScrollPosition = (): void => {
      // Mock function
    };

    const tree = renderer
      .create(
        <Provider store={store}>
          <Reflection handleScrollPosition={mockScrollPosition} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
