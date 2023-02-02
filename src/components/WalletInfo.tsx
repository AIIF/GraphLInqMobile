import React,{useState} from "react";
import {
  Text,
  Link,
  HStack,
  Icon,
  VStack
} from "native-base";

import {  Linking } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

const WalletInfo = (props: any) => {
    return (
        <HStack bg="rgb(32,27,64)" borderRadius={"15"} alignItems={"center"} px="3">
            <Text flex="1" color="#aba1ca" fontSize={"md"} mr="3">1234</Text>
            <Text flex="3" color="#aba1ca" fontSize={"md"} mr="3">0xdb8...<Icon as={Ionicons} name={"open-outline"} size="sm" color="#aba1ca"/></Text>
            <VStack>
                <Text flex="1" color="#aba1ca" fontSize={"md"} >0 </Text>
                <Text flex="1" color="#aba1ca" fontSize={"md"} >ETH</Text>
            </VStack>
        </HStack>
    )
};

export default WalletInfo;