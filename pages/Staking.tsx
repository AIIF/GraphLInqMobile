import React,{ReactChildren, useState} from "react";
import {
  Text,
  Link,
  Center,
  HStack,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Image,
  ScrollView,
  Container,
  Pressable,
  View,
  Button,
  IconButton,
  Icon,
  Menu,
  Input,
  Modal,
  FlatList,
  Hidden,
  useContrastText,
  Card
} from "native-base";

import { Dimensions, Linking,StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";



import { createDrawerNavigator } 
         from '@react-navigation/drawer';
import { NavigationContainer } 
         from '@react-navigation/native';

// Component
import Home from './Home';
import Graphs from './Graphs';
import Wallets from './Wallets';

import CustomSidebarMenu from "../components/SideBarMenu";
import Header from '../components/Header/Header.js'

const Drawer = createDrawerNavigator();
  
const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const DrawerItems=[
  {
    name: 'Home',
    iconName: 'home-outline'
  },
  {
    name: 'My Graphs',
    iconName: 'grid-outline'
  },
  {
    name: 'My Wallets',
    iconName: 'albums-outline'
  }
]

const Navigation =() => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomSidebarMenu {...props} />}>
        {DrawerItems.map(drawer => 
          <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
              drawerInactiveTintColor: "white",
              drawerActiveTintColor: 'rgb(136,127,164)',
              drawerIcon:({focused})=>
              <Icon as={Ionicons} name={drawer.iconName} size={5} color={focused ? "rgb(7,125,255)" : "rgb(136,127,164)"}/>,
              headerShown:true,
                header: () => {
                 return (
                    <Header/>
                  );
                }
            }}
            component={
              drawer.name==='Home' ? Home
              : drawer.name==='My Graphs' ? Graphs
              : Wallets
            }
          />)
        }
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

export default function Staking() {
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  return ( 
    <NativeBaseProvider>
      <View bg="darkBlue.900" w={windowWidth} h={windowHeight} flex="1">
        <Navigation/>
      </View>
    </NativeBaseProvider>
  );
}

