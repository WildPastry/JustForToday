import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation.types';

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
          Steps: {
            screens: {
              Steps: 'two'
            }
          },
          Traditions: {
            screens: {
              Traditions: 'three'
            }
          },
          Promises: {
            screens: {
              Promises: 'four'
            }
          }
        }
      },
      Info: 'modal',
      NotFound: '*'
    }
  }
};

export default linking;
