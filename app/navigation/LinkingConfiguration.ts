import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'one'
            }
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two'
            }
          }
        }
      },
      Modal: 'modal',
      NotFound: '*'
    }
  }
};

export default linking;
