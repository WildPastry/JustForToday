import { Provider } from 'react-redux';
import Step from '../Step';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Step />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Step id={''} step={''} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
