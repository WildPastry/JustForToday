import { Provider } from 'react-redux';
import Steps from '../Steps';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Steps />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Steps />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
