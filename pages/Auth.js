import React,{useState, useContext, useCallback, useEffect} from "react";
import {
  Text,
  Link,
  HStack,
  Heading,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Image,
  Divider,
  ScrollView,
  Container,
  View,
  FlatList,
  Button,
} from "native-base";


import { Dimensions} from 'react-native';
import ImageButton from '../components/Button/ImageButton';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWalletContext } from '../Context/WalletContext';
import axios from 'axios';
import Web3 from "Web3"

import WalletManager from "../components/WalletManager";

const forwarderOrigin = 'http://localhost:19006';

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Logo = require('../assets/logo.svg');

const theme = extendTheme({
  shadows:{
    "1": {
      "box-shadow": "0 0 35px rgba(56,8,255,0.1), 0 0 15px rgb(7,125,255,0.3), 0 0 0 1px rgb(7,125,255,0.3)"
    },
    "0": {
      "box-shadow": "0 0 35px rgba(0,0,0,.1), 0 0 15px rgba(0,0,0,.3), 0 0 0 1px rgba(0,0,0,.3)"
    }
  }
});

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function Auth(props) {

  const {walletInfo, setWalletInfo} = useWalletContext();
  
  let onboarding;
  let accounts;
 
  onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const isMetaMaskConnected = () => accounts && accounts.length > 0

  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  function handleNewAccounts (newAccounts) {
    accounts = newAccounts;
    console.log('as',accounts)
    MetaMaskConnect();
  }
  const Connect = async () => {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      handleNewAccounts(newAccounts);
      console.log('account',accounts)
    } catch (error) {
      console.error(error)
    }
  }

  const getEthBalance = async() => {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access
      await window.ethereum.enable();
      var accounts = await web3.eth.getAccounts();
      web3.eth.getBalance('0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24')
      .then(ethBalance => {
        walletInfo.EthBalance = ethBalance;
        console.log(walletInfo);
      })
        
      return true
    } catch(e) {
      // User denied access
      return false
    }
  }
  const MetaMaskConnect = () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
      onboarding.startOnboarding();
    } else if (isMetaMaskConnected()) {
      console.log('connected');
      walletInfo.accountInfo = accounts;
      walletInfo.etherBalance = ethereum.request({ method: 'eth_getBalance'});
     // setWalletInfo({ accountInfo: accounts});
      console.log("wallet:", walletInfo.accountInfo);
      
      Eth();

       {props.onPageChanged('Home')}
      //Actions.home();
      if (onboarding) {
        onboarding.stopOnboarding()
      }  
    } else {
      
      Connect();
      console.log('connect');
    }
  };

  useEffect(() => {
    getEthBalance();
  }, [])

  return ( 
    <NativeBaseProvider config={config} theme={theme}>
      <Container flex="1">
        <View bg="darkBlue.900"  width={windowWidth}
        height={windowHeight}
        alignItems={"center"} flexDirection="column">      
          <Heading  py={"5"}>
            <Image
              src={Logo}
              width={windowWidth*0.6}
              maxWidth={"640"}
              height={"full"}
              maxHeight={"150"}
              style={{resizeMode:"contain"}}
            />
          </Heading>
          
          <Box
            borderRadius={["32","32","36"]}
            overflow="hidden"
            width={windowWidth*0.9}
            h={windowHeight*0.7}
            bg={{ linearGradient:{
              colors: ['#1d1938', '#15122b'],
              start:[0,0],
              end:[1,0]
            }}}
            shadow="0"
            >
            <Box bgColor="rgb(32,27,64)" textAlign={"center"} py={"5"}>
              <VStack >
                <Text 
                bold 
                fontSize={["lg","1xl","2xl","3xl","4xl"]} 
                color="white"> 
                Dashboard Access
                </Text>
                <Text 
                fontSize={["xs","sm","md","md","lg"]} 
                color="gray.500"> 
                Connect your wallet to access your dashboard
                </Text>
              </VStack>
            </Box>
            <Divider bg={{ linearGradient:{
              colors: ['rgb(56,8,255)', 'rgb(7,125,255)'],
              start:[0,0],
              end:[1,0]
            }}}
            alignSelf="center"/>
            {/* {isMetaMaskInstalled()?
            <View px={["3","5","7","10"]} py={["5","5","5","10"]}> 
              <ImageButton label={"MetaMask"} btnimg={require('../assets/icons/metamask.svg')}  onMetaMaskConnect={MetaMaskConnect}/>
            </View>
            :
            <View px={["3","5","7","10"]} py={["5","5","5","10"]}> 
              <View mb={["5","5","5","10"]}> <ImageButton label={"WalletConnect"} btnimg={require('../assets/icons/walletConnect.svg')} /> </View>
              <View mb={["5","5","5","10"]}> <ImageButton label={"Open in Coinbase Wallet"} btnimg={require('../assets/icons/coinbaseWallet.svg')} /> </View> 
              <View mb={["5","5","5","10"]}> <ImageButton label={"Fortmatic"} btnimg={require('../assets/icons/fortmatic.svg')}/> </View>
            </View>
            } */}
            <WalletManager onPageChanged={props.onPageChanged}/>
          </Box>
          <View flexDirection={"row"} justifyContent={"center"} 
            h={windowHeight*0.2}
          >
            <Text fontSize={["xs","sm","md","lg"]} color="#aba1ca"> New to GraphLinq Wallet? </Text>
            <Link href="https://docs.graphlinq.io/wallet">
              <Text color="blue.500" underline fontSize={["xs","sm","md","lg"]}>
                Learn more
              </Text>
            </Link>
          </View>
        </View>
      </Container>
    </NativeBaseProvider>
  );
}

