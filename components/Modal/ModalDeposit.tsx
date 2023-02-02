import React,{useState} from 'react';
import {
  View,
  Image,
  Text,
  Link,
  Box,
  Icon,
  Button,
  Modal,
  IconButton,
  Pressable
} from 'native-base';

import { StyleSheet, SafeAreaView, Linking} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const ModalDeposit = (props:any) => {
    const [depositNum, setDepositNum] = useState("0.0");

    return (
        <Modal isOpen={props.depositModalVisible} onClose={props.setDepositModalVisible} size={"md"}>
          <Modal.Content maxH="212" borderRadius="15">
            <Modal.CloseButton/>
            <Modal.Header bg="rgb(32,27,64)" borderColor={"rgb(32,27,64)"}><Text color="white" textAlign={"center"} fontSize="xl">Cloud Balance Deposit</Text></Modal.Header>
            <Modal.Body bg="rgb(32,27,64)" alignItems={"center"}>
              <Box bg="black" borderRadius={"32"} mx="3" flexDirection={"row"} alignItems="center" justifyContent={"space-between"} w="90%">
                <Text color="white" fontSize={"xl"} ml="5">{depositNum} GLQ</Text>
                <Box flexDirection={"column"} borderLeftColor={"rgb(32,27,64)"} borderLeftWidth="1">
                  <IconButton variant={"ghost"} borderTopRightRadius="32" h="5" w="7"
                  icon={<Icon as={Ionicons} name="caret-up" /> } 
                  _icon={{color:"rgb(32,27,64)", size:"sm"}}
                  _pressed={{backgroundColor:"white"}}
                  onPress={() => { setDepositNum((parseFloat(depositNum)+0.1).toString());}}
                  />
                  <IconButton borderLeftColor={"rgb(32,27,64)"}  variant={"ghost"} borderBottomRightRadius="32" h="5" w="7"
                  icon={<Icon as={Ionicons} name="caret-down" />} 
                  _icon={{color:"rgb(32,27,64)", size:"sm"}}
                  _pressed={{backgroundColor:"white"}}
                  onPress={() => { if(parseFloat(depositNum) >= 0.1) {setDepositNum((parseFloat(depositNum)-0.1).toString());}}}
                  />
                </Box>
              </Box>
              
              <Pressable mt="5" w="30%"> 
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
                          justifyContent="center"
                          alignItems={"center"} 
                      >
                      <View style={{borderRadius:32}}  justifyContent="center" p="2">
                        <Text textAlign={"center"} color="white" fontSize={"sm"} bold>Deposit</Text>
                      </View>
                  </LinearGradient>
                  }}
              </Pressable>
            </Modal.Body>
          </Modal.Content>
      </Modal>
    );
};

export default ModalDeposit;