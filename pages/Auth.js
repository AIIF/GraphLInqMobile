import React,{useState} from "react";
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

import {useWalletConnect} from '@walletconnect/react-native-dapp';
import { Dimensions} from 'react-native';
import ImageButton from '../components/Button/ImageButton';
import MetaMaskOnboarding from '@metamask/onboarding';
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

const buttonDetails =[
  {
    label: "MetaMask",
    imgUrl: require('../assets/icons/metamask.svg')
  },
  {
    label: "WalletConnect",
    imgUrl: require('../assets/icons/walletConnect.svg')
  },
  {
    label: "Coinbase Wallet",
    imgUrl: require('../assets/icons/coinbaseWallet.svg')
  },
  {
    label: "Fortmatic",
    imgUrl: require('../assets/icons/fortmatic.svg')
  },
  {
    label: "Portis",
    imgUrl: require('../assets/icons/portis.svg')
  },
];

function Content() {
  const [button, selectButton] = React.useState(0);
  const [shouldShow, setShouldShow] = useState(false);

  return (
    <ScrollView px={["3","5","7","10"]} py={["5","5","5","10"]}>
      <FlatList  m="1" data={buttonDetails}
        renderItem={({item}) => {
          return (
            <View mb={["5","5","5","10"]}> 
              <ImageButton label={item.label} btnimg={item.imgUrl}/> 
            </View>
          )
      }} />
    </ScrollView>
  )
}

export default function Auth(props) {

  let onboarding;
  let accounts;
  let piggybankContract;

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
      MetaMaskConnect();
      console.log('account',accounts)
      // {props.onPageChanged('Main')}
    } catch (error) {
      console.error(error)
    }
  }

  const MetaMaskConnect = () => {
    // accounts = ethereum.request({
    //   method: 'eth_accounts',
    // })

    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
      onboarding.startOnboarding();
    } else if (isMetaMaskConnected()) {
      console.log('connected');
      {props.onPageChanged('Main')}
      if (onboarding) {
        onboarding.stopOnboarding()
      }  
    } else {
      Connect();
      console.log('connect');
    }
  };

  function onMetaMaskConnect()
  {
    MetaMaskConnect();
  }

  return ( 
    <NativeBaseProvider config={config} theme={theme}>
      <Container flex="1">
        <View bg="darkBlue.900"  width={windowWidth}
        height={windowHeight}
        alignItems={"center"} flexDirection="column">      
          <Heading flex="0.7" py={["1","3","5"]}>
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
            maxWidth={"960"}
            height={"80%"}
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
            {isMetaMaskInstalled()?
            <View px={["3","5","7","10"]} py={["5","5","5","10"]}> 
              <ImageButton label={"MetaMask"} btnimg={require('../assets/icons/metamask.svg')}  onMetaMaskConnect={onMetaMaskConnect}/>
            </View>
            :
            <View px={["3","5","7","10"]} py={["5","5","5","10"]}> 
              <View mb={["5","5","5","10"]}> <ImageButton label={"WalletConnect"} btnimg={require('../assets/icons/walletConnect.svg')} /> </View>
              <View mb={["5","5","5","10"]}> <ImageButton label={"Open in Coinbase Wallet"} btnimg={require('../assets/icons/coinbaseWallet.svg')} /> </View> 
              <View mb={["5","5","5","10"]}> <ImageButton label={"Fortmatic"} btnimg={require('../assets/icons/fortmatic.svg')}/> </View>
            </View>
            }
            
          </Box>
          <View flexDirection={"row"} justifyContent={"center"} 
            flex="0.3"
            >
            <Text fontSize={["xs","sm","md","lg"]} color="rgb(136,127,164)"> New to GraphLinq Wallet? </Text>
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

