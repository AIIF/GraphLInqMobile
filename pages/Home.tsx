import React,{useState} from "react";
import {
  Text,
  Link,
  Center,
  HStack,
  VStack,
  Box,
  Image,
  ScrollView,
  Pressable,
  View,
  Button,
  Icon,
  Input,
  Modal,
  FlatList,
} from "native-base";

import { Dimensions, Linking } from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import PageHeader from '../components/Header/pageHeader';
import GraphDetail from "../components/Graphs/GraphDetail";
import GraphTemplate from '../components/Graphs/GraphTempate';

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [mainContentType, setMainContentType] = useState('graphTemplate');
  const [templateID, setTemplateID] = useState(null);
  const [graphName, setGraphName] = useState(null);

  const onModalVisibleChanged = (modalVisible: any) => {
    setModalVisible(modalVisible);
  }

  const onMainContentTypeChanged = (type: any) => {
    setMainContentType(type);
  }

  const onTemplateIDChanged = (graphTemplateID : any) => {
    setTemplateID(graphTemplateID);
  };

  const onGraphNameChanged = (graphName : any) => {
    setGraphName(graphName);
  };

  return  (
    <View style={{ flex: 1, alignItems: 'center', 
                   justifyContent: 'center' }}  bg="darkBlue.900" width={windowWidth} height={windowHeight}>
      <ScrollView p={["7","10"]} flexDirection={"column"}>
        <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"} borderRadius="32" >
          <Modal.Content maxH="212" borderRadius="15">
            <Modal.CloseButton />
            <Modal.Header bg="rgb(32,27,64)" borderColor={"transparent"}><Text color="rgb(136,127,164)" fontSize={"xl"}>Import a Graph</Text></Modal.Header>
            <Modal.Body bg="darkBlue.900">
              <Pressable >
                {({isPressed}) => {
                  return <Box bg="rgb(32,27,64)" style={{
                    borderRadius: 32,
                    alignContent: "center",
                    transform: [{scale: isPressed ? 0.95 : 1}]
                  }}
                  >
                    <Text color="rgb(136,127,164)" fontSize={"md"} textAlign="center" p="3">Import .GLQ</Text>
                </Box>
                }}
              </Pressable>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        
        <PageHeader title="Template Wizard" buttonName="Import .GLQ" iconName="upload" iconAs={FontAwesome} eventChanged={() => onModalVisibleChanged(true)}/>

        <Box justifyContent={"stretch"} alignItems="center" bg="rgb(32,27,64)" flexDirection={"row"} borderRadius="50" px={["3","5","7"]} mb={["3","5","7"]}>
          <Icon as={Ionicons} name="information-circle-outline" size="4" color="blue.800"/>
          <Text color="rgb(136,127,164)" fontSize={"ms"} p="2" lineHeight={'16'}>
            GraphLinq's Instant Deploy Wizard lets you choose a template, fill in variables and deploy it instantly without having to code or making any changes on the IDE
          </Text>
        </Box>

        <VStack>

          {mainContentType==='graphTemplate'?      
          (<GraphTemplate onTemplateIDChanged={onTemplateIDChanged} onGraphNameChanged={onGraphNameChanged} onMainContentTypeChanged={onMainContentTypeChanged}/>)
          :(<GraphDetail onMainContentTypeChanged={onMainContentTypeChanged} graphName={graphName} templateID={templateID}/>)
          }

          <Box justifyContent={"stretch"}  bg="rgb(32,27,64)" flexDirection={"column"} borderRadius="12" p={["7","10","15"]}>
            <Icon alignSelf={"center"} as={Ionicons} name="information-circle-outline" size="9" color="blue.800"/>
            <Text color="white" fontSize={"xl"} px="5" textAlign={"center"} bold pb="3">
              How to use a template?
            </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} > You can: </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} > - Select a template from the list </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} > - Fill in required variables </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} > Or for more advanced user: </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} > - Select a template </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} > - Download it </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} > - Upload & Edit On the <Link href="https://ide.graphlinq.io" color="blue.900" fontSize={"md"}>IDE</Link><Text> to suit their needs</Text>
            </Text>
            <Text color="rgb(136,127,164)" fontSize={"md"} textAlign="center"> 
              You can also make your own custom Graph from scratch using our <Link href="https://ide.graphlinq.io" color="blue.900" fontSize={"md"}>IDE </Link>
            </Text>
          </Box>
        </VStack>
      </ScrollView>
  </View>
  )
};