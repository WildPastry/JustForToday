import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

import { TRootStackParamList } from '../types/navigation';

const linking: LinkingOptions<TRootStackParamList> = {
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
          Reflections: {
            screens: {
              Reflections: 'two'
            }
          },
          Support: {
            screens: {
              Support: 'three'
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
