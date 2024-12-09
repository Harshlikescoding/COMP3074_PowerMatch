import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapScreen from './screens/MapScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Header } from './components/Header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);  // Set to true to skip login screen
  const [chats, setChats] = useState([]);

  const handleNewMatch = (newMatch) => {
    setChats((prevChats) => [...prevChats, newMatch]);
  };

  const MainTabNavigator = () => (
    <>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = 'map';
            } else if (route.name === 'Exercise Analytics') {
              iconName = 'area-chart';
            } else if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Chat') {
              iconName = 'comments';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ 
            headerShown: true, 
            header: () => (
              <SafeAreaView>
                <Header />
              </SafeAreaView>
            )
          }}
        />
        <Tab.Screen 
          name="Exercise Analytics" 
          component={AnalyticsScreen} 
          options={{ 
            headerShown: true, 
            header: () => (
              <SafeAreaView>
                <Header />
              </SafeAreaView>
            )
          }}
        />
        <Tab.Screen 
          name="Home" 
          component={() => <HomeScreen onNewMatch={handleNewMatch} />} 
          options={{ 
            headerShown: true, 
            header: () => (
              <SafeAreaView>
                <Header />
              </SafeAreaView>
            )
          }}
        />
        <Tab.Screen 
          name="Chat" 
          component={() => <ChatScreen chats={chats} />} 
          options={{ 
            headerShown: true, 
            header: () => (
              <SafeAreaView>
                <Header />
              </SafeAreaView>
            )
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ 
            headerShown: true, 
            header: () => (
              <SafeAreaView>
                <Header />
              </SafeAreaView>
            )
          }}
        />
      </Tab.Navigator>
    </>
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <LoginScreen setIsAuthenticated={setIsAuthenticated} />}
    </NavigationContainer>
  );
};

export default App;
