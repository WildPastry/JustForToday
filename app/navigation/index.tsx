import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps
} from '../types/navigation.types';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screens/Home';
import Info from '../screens/Info';
import LinkingConfiguration from './LinkingConfiguration';
import NotFoundScreen from '../screens/NotFoundScreen';
import Reflections from '../screens/Reflections';
import Support from '../screens/Support';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Info' component={Info} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// A bottom tab navigator displays tab buttons at the bottom of the screen
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { backgroundColor: '#21142b' },
        tabBarLabelStyle: { marginBottom: 4 },
        tabBarIconStyle: { marginTop: 4 }
      }}>
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Info')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1
              })}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name='Reflections'
        component={Reflections}
        options={{
          title: 'Reflections',
          tabBarIcon: ({ color }) => <TabBarIcon name='book' color={color} />
        }}
      />
      <BottomTab.Screen
        name='Support'
        component={Support}
        options={{
          title: 'Support',
          tabBarIcon: ({ color }) => <TabBarIcon name='cog' color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

// Icons for the tabs
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} {...props} />;
}
