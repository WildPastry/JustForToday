import { Provider } from 'react-redux';
import Reflection from '../layout/Reflection';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Reflection />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Reflection />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
