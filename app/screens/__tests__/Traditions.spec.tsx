import { Provider } from 'react-redux';
import Traditions from '../Traditions';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Traditions />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Traditions />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
