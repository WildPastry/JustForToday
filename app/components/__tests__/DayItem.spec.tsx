import DayItem from '../layout/DayItem';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<DayItem />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <DayItem id={''} name={''} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
