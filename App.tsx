import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/home';
import Explore from './screens/explore';
import Create from './screens/create';
import  Notify from './screens/notify';
import Personal from './screens/personal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View , StyleSheet} from 'react-native';
import tw from 'twrnc';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({route}) => ({
          title: "",
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let iconName
            if(route.name === "Home"){
              iconName = focused ? require("./assets/images/icon-home-active.png") : require("./assets/images/icon-home.png")
            }else if(route.name === "Explore"){
              iconName = focused ? require("./assets/images/icon-explore-active.png") : require("./assets/images/icon-explore.png")
            }else if(route.name === "Create"){
              iconName = require("./assets/images/icon-create.png")
            }else if(route.name === "Notify"){
              iconName = focused ? require("./assets/images/icon-noti-active.png") : require("./assets/images/icon-noti.png")
            }else{
              iconName = require("./assets/images/icon-personal.png")
            }
             return <Image source={iconName} style={tw `w-20 h-full mt-4`}/>
          }
        })}
        >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Create" component={Create} />
        <Tab.Screen name="Notify" component={Notify} />
        <Tab.Screen name="Personal" component={Personal} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}