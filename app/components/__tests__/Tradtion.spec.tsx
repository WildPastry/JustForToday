import { Provider } from 'react-redux';
import Tradition from '../Tradition';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Tradition />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Tradition id={''} tradition={''} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
