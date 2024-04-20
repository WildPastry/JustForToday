import * as React from 'react';
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { ColorSchemeName, Pressable } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { EDeviceSizes, IDeviceSize } from '../types/generic.types';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps
} from '../types/navigation.types';
import About from '../screens/About';
import Colours from '../constants/Colours';
import Control from '../constants/Control';
import Home from '../screens/Home';
import InfoIcon from '../components/InfoIcon';
import LinkingConfiguration from './LinkingConfiguration';
import Logo from '../components/Logo';
import NotFoundScreen from '../screens/NotFoundScreen';
import Steps from '../screens/Steps';
import Traditions from '../screens/Traditions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import getDeviceSize from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A stack navigator is used for displaying modals on top of other content
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  // Font settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    <Stack.Navigator>
      {/* The root screen is the BottomTab */}
      {/* The initial route of the bottom tab is Home */}
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {/* Not found */}
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      {/* About screen - modal */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='About'
          component={About}
          options={({ navigation }) => ({
            headerTitleStyle: {
              fontSize: Control[deviceSize].tabHeading
            },
            // Arrow icon for going back
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1
                })}>
                <AntDesign
                  name='arrowleft'
                  size={Control[deviceSize].icon}
                  color={Colours[colorScheme].icon}
                  style={{ marginRight: Control[deviceSize].iconMargin }}
                />
              </Pressable>
            )
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// A bottom tab navigator displays tab buttons at the bottom of the screen
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const LogoComponent = () => <Logo />;

function BottomTabNavigator() {
  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  // Font settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  /*
   * Helper function for icon width
   * Larger screens need to display the icon side by side
   */
  const getIconWidth = (): number => {
    return deviceSize === EDeviceSizes.LRG
      ? Control[deviceSize].icon + 20
      : Control[deviceSize].icon;
  };

  return (
    // Screen options for the top and bottom sections
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: Colours[colorScheme].tabIconActive,
        tabBarInactiveTintColor: Colours[colorScheme].tabIconDefault,
        tabBarLabelStyle: {
          fontSize: Control[deviceSize].tabLabel,
          marginBottom: Control[deviceSize].tabMarginBottom
        },
        tabBarIconStyle: { marginTop: Control[deviceSize].tabMarginTop },
        tabBarStyle: {
          backgroundColor: Colours[colorScheme].navBackground,
          height: Control[deviceSize].bottomTabHeight,
          borderTopColor: Colours[colorScheme].navBorder,
          borderTopWidth: 0.6,
          elevation: 0
        },
        headerStyle: {
          backgroundColor: Colours[colorScheme].navBackground,
          borderBottomColor: Colours[colorScheme].navBorder,
          borderBottomWidth: 0.6,
          height: Control[deviceSize].topTabHeight
        },
        headerTitleAlign: 'center'
      }}>
      {/* Home screen */}
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          headerTitle: LogoComponent,
          tabBarIcon: ({ color }) => (
            <TabBarAwesome5Icon
              name='chair'
              color={color}
              width={getIconWidth()}
              size={Control[deviceSize].icon}
            />
          ),
          // Link to About screen
          headerRight: () => <InfoIcon navigation={navigation} />
        })}
      />
      {/* Steps screen */}
      <BottomTab.Screen
        name='Steps'
        component={Steps}
        options={({ navigation }: RootTabScreenProps<'Steps'>) => ({
          title: 'Steps',
          headerTitle: LogoComponent,
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon
              name='stairs'
              color={color}
              width={getIconWidth()}
              size={Control[deviceSize].icon}
            />
          ),
          // Link to About screen
          headerRight: () => <InfoIcon navigation={navigation} />
        })}
      />
      {/* Traditions screen */}
      <BottomTab.Screen
        name='Traditions'
        component={Traditions}
        options={({ navigation }: RootTabScreenProps<'Traditions'>) => ({
          title: 'Traditions',
          headerTitle: LogoComponent,
          tabBarIcon: ({ color }) => (
            <TabBarAwesomeIcon
              name='book'
              color={color}
              width={getIconWidth()}
              size={Control[deviceSize].icon}
            />
          ),
          // Link to About screen
          headerRight: () => <InfoIcon navigation={navigation} />
        })}
      />
    </BottomTab.Navigator>
  );
}

// Icons for the bottom tabs
function TabBarAwesomeIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number;
  width: number;
}) {
  return <FontAwesome {...props} />;
}

function TabBarAwesome5Icon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
  size: number;
  width: number;
}) {
  return <FontAwesome5 {...props} />;
}

function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  size: number;
  width: number;
}) {
  return <MaterialCommunityIcons {...props} />;
}
