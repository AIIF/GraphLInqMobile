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
} from 'native-base';

import { StyleSheet, SafeAreaView, Linking} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Logo = require('../assets/logo.svg');

import ModalDeposit from './Modal/ModalDeposit';
import ModalWithdraw from './Modal/ModalWithdraw';

const CustomSidebarMenu = (props: any) => {
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);

  return (
    <View style={{flex: 1}} bg="rgb(32,27,64)" >
      <ModalDeposit depositModalVisible={depositModalVisible} setDepositModalVisible={setDepositModalVisible} />
      <ModalWithdraw withdrawModalVisible={withdrawModalVisible} setWithdrawModalVisible={setWithdrawModalVisible} />
      
      {/*Top Large Image */}
      <Image
        source={Logo}
        style={styles.sideMenuProfileIcon}
      />
      <Text textAlign={"center"} fontSize="sm" color="rgb(136,127,164)" my={"2"}> Cloud Contract Balance</Text>
      <Box bg="black" borderRadius={"32"} mx="10" alignItems={"center"} justifyContent="space-between" flexDirection={"row"} px="3" py="1">
        <Text  fontSize="xl" color="white" bold>0 </Text>
        <Text  fontSize="xs" color="rgb(136,127,164)" >GLQ</Text>
      </Box>
      <Box  alignItems={"center"} justifyContent="center" mx="10" my="2" flexDirection={"row"}>
        <Button onPress={()=> {setDepositModalVisible(true);}} borderRadius={"32"} endIcon={<Icon as={Ionicons} name="arrow-up-circle" size="sm" color="rgb(32,27,64)"/>} bg="darkBlue.900" mr="2" w="50%">
          Deposit
        </Button>
        <Button onPress={()=> {setWithdrawModalVisible(true);}} borderRadius={"32"} endIcon={<Icon as={Ionicons} name="arrow-down-circle" size="sm" color="rgb(32,27,64)" />} bg="darkBlue.900" w="50%" ml="2">
          Withdraw
        </Button>
      </Box>
      <DrawerContentScrollView {...props} >
        <DrawerItemList {...props} style={{margin:5, backgroundColor: 'white'}}/>        
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: 200,
    height: 50,
    alignSelf: 'center',
  }
});

export default CustomSidebarMenu;