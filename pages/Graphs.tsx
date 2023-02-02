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
import PageHeader from "../components/Header/pageHeader";

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

const menuItems =[{
  name : "play-outline",
  desc : "Start",
  color : 'green.900',
}, {
  name : "play-outline",
  desc : "Force start",
  color : 'green.900'
}, {
  name : "stop-outline",
  desc : "Stop",
  color : 'blue.900'
}, {
  name : "document-outline",
  desc : "Export as .GLQ File",
  color : 'blue.900'
}, {
  name : "trash-outline",
  desc : "Delete",
  color : 'red.900'
},{
  name : "eye-outline",
  desc : "View Logs",
  color : 'white'
}
];

const graphs = (props: any) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const onModalVisibleChanged = (detailModalVisible: any) => {
    setDetailModalVisible(detailModalVisible);
  }

  return (
  <NativeBaseProvider config={config}>
    <View style={{ flex: 1 }} justifyContent="space-between" bg="darkBlue.900" width={windowWidth} height={windowHeight} >
      <ScrollView flexDirection={"column"} p={["7","10"]} >
      <Modal isOpen={detailModalVisible} onClose={setDetailModalVisible} size={"lg"} borderRadius="32" >
        <Modal.Content maxH="250" borderRadius="15">
          <Modal.CloseButton />
            <Modal.Header bg="rgb(32,27,64)" borderColor={"transparent"}><Text color="rgb(136,127,164)" fontSize={"lg"}>More</Text></Modal.Header>
            <Modal.Body bg="darkBlue.900">
              {menuItems.map((item) => {
                return <Pressable> 
                {({isPressed}) => {
                  return <Box m="2" flexDirection={"row"} justifyContent="left" px="2" alignItems={"center"}>
                    <Icon as={Ionicons} name={item.name} size="sm" color={item.color}/>
                    <Text color="rgb(136,127,164)" fontSize={"md"} > {item.desc} </Text>
                  </Box>
                }}
                </Pressable>
              })}
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <PageHeader title="Graphs" buttonName="New Graph" iconName="add-circle-outline" iconAs={Ionicons} eventChanged={() => props.onContentChanged('Home')} />

      <Box justifyContent={"stretch"} alignItems="center" bg="rgb(32,27,64)" flexDirection={"row"} borderRadius="50" px={["3","5","7"]} mb={["3","5","7"]}>
        <Icon as={Ionicons} name="information-circle-outline" size="4" color="blue.800"/>
        <Text color="rgb(136,127,164)" fontSize={"ms"} p="1" lineHeight={'16'}>
          Below is the list of your Graphs. You can view logs, stop or delete each one of them.
        </Text>
      </Box>
      
      <Box bg="rgb(32,27,64)" flexDirection={"column"} borderRadius="12" p={["3","5","7"]}>
        <VStack>
          <HStack justifyContent={"space-between"} mb="3">
            <HStack>
              <Icon size="xs" as={Ionicons} name={"ellipse"} color="green.900" m="1"/>
              <VStack>
                <Text color="rgb(136,127,164)" fontSize={"sm"} > Demo </Text>
                <Text color="rgb(136,127,164)" fontSize={"xs"} > 13d6664fd694ae55967c5cd7aa56a82... </Text>
              </VStack>
            </HStack>
            <Pressable onPress={() => setDetailModalVisible(true)}>
              <Icon size={"lg"} as={Ionicons} name={"ellipsis-vertical-circle-outline"} color="rgb(136,127,164)" />
            </Pressable>   
          </HStack>

          <VStack justifyContent={"left"}>
            <Text color="rgb(136,127,164)" fontSize={"sm"} > Hosted API : </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} mb="2" bold pl="5"> </Text>
            <Text color="rgb(136,127,164)" fontSize={"sm"} > Execution cost : </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} mb="2" bold pl="5"> 0.02799000 GLQ</Text>
            <Text color="rgb(136,127,164)" fontSize={"sm"} > Running since : </Text>
            <Text color="rgb(126,127,164)" fontSize={"md"} mb="2" bold pl="5"> 122 hours, 26.94 minutes</Text>
            <Text color="rgb(126,127,164)" fontSize={"sm"} > Created : </Text>
            <Text color="rgb(126,127,164)" fontSize={"md"} mb="2" bold pl="5"> 12/28/2022, 4:51:26 AM</Text>
            </VStack>
        </VStack>
      </Box>
      </ScrollView>
    </View>
  </NativeBaseProvider>
  )
}

export default graphs;