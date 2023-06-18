import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps
} from '../types/navigation.types';
import About from '../screens/About';
import Colours from '../constants/colours';
import { FontBold } from '../components/styles/StyledText';
import Home from '../screens/Home';
import LinkingConfiguration from './LinkingConfiguration';
import NotFoundScreen from '../screens/NotFoundScreen';
import Steps from '../screens/Steps';
import Traditions from '../screens/Traditions';
import { View } from '../components/styles/Themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import globlStyles from './../constants/styles';
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
        <Stack.Screen name='About' component={About} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// A bottom tab navigator displays tab buttons at the bottom of the screen
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  function HomeHeader() {
    return (
      <View style={globlStyles.headerContainer}>
        {/* Logo */}
        <FontAwesome5
          name='chair'
          size={14}
          color={Colours[colorScheme].text}
          style={{ marginTop: 2 }}
        />
        {/* Title */}
        <FontBold style={globlStyles.header}>HOME</FontBold>
      </View>
    );
  }

  function StepsHeader() {
    return (
      <View style={globlStyles.headerContainer}>
        {/* Logo */}
        <MaterialCommunityIcons
          name='stairs'
          size={20}
          color={Colours[colorScheme].text}
          style={{ marginTop: 2 }}
        />
        {/* Title */}
        <FontBold style={globlStyles.headerSteps}>STEPS</FontBold>
      </View>
    );
  }

  function TraditionsHeader() {
    return (
      <View style={globlStyles.headerContainer}>
        {/* Logo */}
        <FontAwesome
          name='book'
          size={16}
          color={Colours[colorScheme].text}
          style={{ marginTop: 4 }}
        />
        {/* Title */}
        <FontBold style={globlStyles.header}>TRADITIONS</FontBold>
      </View>
    );
  }

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: Colours[colorScheme].tabIconActive,
        tabBarInactiveTintColor: Colours[colorScheme].tabIconDefault,
        tabBarLabelStyle: { marginBottom: 7 },
        tabBarIconStyle: { marginTop: 7 },
        tabBarStyle: {
          backgroundColor: Colours[colorScheme].navBackground,
          height: 55,
          borderTopColor: Colours[colorScheme].navBorder,
          borderTopWidth: 0.6,
          elevation: 0
        },
        headerStyle: {
          backgroundColor: Colours[colorScheme].navBackground,
          borderBottomColor: Colours[colorScheme].navBorder,
          borderBottomWidth: 0.6,
          height: 70
        }
      }}>
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          headerTitle: () => <HomeHeader />,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='chair' size={18} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('About')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1
              })}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colours[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name='Steps'
        component={Steps}
        options={({ navigation }: RootTabScreenProps<'Steps'>) => ({
          title: 'Steps',
          headerTitle: () => <StepsHeader />,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='stairs' size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('About')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1
              })}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colours[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name='Traditions'
        component={Traditions}
        options={({ navigation }: RootTabScreenProps<'Traditions'>) => ({
          title: 'Traditions',
          headerTitle: () => <TraditionsHeader />,
          tabBarIcon: ({ color }) => (
            <FontAwesome name='book' size={20} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('About')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1
              })}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={Colours[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
    </BottomTab.Navigator>
  );
}
