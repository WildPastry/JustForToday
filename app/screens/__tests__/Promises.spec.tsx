import Promises from '../Promises';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Promises />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Promises />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
