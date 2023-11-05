import MonthItem from '../layout/MonthItem';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<MonthItem />', () => {
  it('renders correctly', () => {
    const store = makeStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <MonthItem id={''} name={''} days={[]} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
