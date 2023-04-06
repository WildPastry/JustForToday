import { Provider } from 'react-redux';
import Reflections from '../Reflections';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Reflections />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Reflections />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
