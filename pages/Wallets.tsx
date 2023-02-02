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
  FormControl,
  NativeBaseProvider
} from "native-base";

import { Dimensions, Linking } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

import PageHeader from "../components/Header/pageHeader";
import WalletInfo from "../components/WalletInfo";

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Wallets = (props: any) => {
    const [detailModalVisible, setDetailModalVisible] = useState(false);

    const onModalVisibleChanged = (detailModalVisible: any) => {
        setDetailModalVisible(detailModalVisible);
    }

    return (
    <NativeBaseProvider>
        <View style={{ flex: 1}} justifyContent="space-between" bg="darkBlue.900" width={windowWidth} height={windowHeight}  p={["7","10"]}>
            <ScrollView flexDirection={"column"}>
                <Modal isOpen={detailModalVisible} onClose={setDetailModalVisible} size={"lg"} borderRadius="32" >
                    <Modal.Content maxH="250" borderRadius="15">
                        <Modal.CloseButton />
                        <Modal.Header bg="rgb(32,27,64)" borderColor={"transparent"}><Text color="#aba1ca" fontSize={"lg"}>More</Text></Modal.Header>
                        <Modal.Body bg="rgb(32,27,64)">
                            <FormControl>
                                <FormControl.Label color="#aba1ca" fontSize={"2xl"}>Wallet Name:</FormControl.Label>
                                <Input bg="black" fontSize={"md"} color="white" borderColor={"transparent"} borderRadius="12" m="3"/>
                            </FormControl>  
                        </Modal.Body>
                        <Modal.Footer bg="rgb(32,27,64)" justifyContent={"right"} alignItems="center" borderColor={"transparent"}>
                            <View alignItems={"center"} justifyContent="right" flexDirection={"row"}>
                                <Pressable > 
                                    {({isPressed}) => {
                                        return <LinearGradient
                                            colors={['rgb(56,8,255)', 'rgb(7,125,255)']}
                                            start={[0,0]}
                                            end={[1,0]}
                                            style={{
                                            borderRadius: 32,
                                            alignContent: "center",
                                            transform: [{scale: isPressed ? 0.95 : 1}]
                                            }}
                                        >
                                        <View borderRadius="32" alignItems={"center"} justifyContent="center" mx="3" my="1">
                                            <Text color="white" fontSize={"md"} bold>Create</Text>
                                        </View>
                                    </LinearGradient>
                                    }}
                                </Pressable>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setDetailModalVisible(false);
                                }}>
                                <Text color="#aba1ca" fontSize={"md"} bold>Cancel</Text>   
                                </Button>
                            </View>
                        </Modal.Footer>
                    </Modal.Content>
                    </Modal>

                <PageHeader title="My Wallets" buttonName="Create Wallet" iconAs={MaterialIcons} iconName="add" eventChanged={() => onModalVisibleChanged(true)}/>

                <HStack justifyContent={"space-between"} px="3">
                    <Text flex="1" color="#aba1ca" fontSize={"md"} mr="3">Wallet name</Text>
                    <Text flex="3" color="#aba1ca" fontSize={"md"} mr="3">Address</Text>
                    <Text flex="1" color="#aba1ca" fontSize={"md"} >Ether Amount</Text>
                </HStack>
                <VStack>
                    <WalletInfo/>
                </VStack>
            </ScrollView>
        </View>                      
    </NativeBaseProvider>
    )
}

export default Wallets;