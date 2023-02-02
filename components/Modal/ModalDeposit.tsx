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
  Pressable,
  useDisclose,
  Stack,
  extendTheme,
  NativeBaseProvider
} from 'native-base';

import { FiArrowUpRight } from 'react-icons/fi';
import { useBalanceContract, useTokenContract } from '../../hooks/useContract';
import { getDecimalsAmount } from '../../utils';
import { useActiveWeb3React } from '../../hooks';
import { utils } from 'ethers';
import { useBalance } from '../../hooks/useBalance';
import { useWalletContract } from '../../hooks/useWalletContract';

import { StyleSheet, SafeAreaView, Linking} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { any } from 'prop-types';

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

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

const ModalDeposit = (props: any) => {
    const [depositNum, setDepositNum] = useState('0.0');

    const { isOpen, onOpen, onClose } = useDisclose()
    const finalRef = React.useRef()
    const contract = useBalanceContract("0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24");
    const tokenContract = useTokenContract("0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24")


    const {balance, refreshBalance} =  useBalance();
    const {refreshBalanceContract} =  useWalletContract();
    
    const { account } = useActiveWeb3React()
    const [amountDeposit, setAmountDeposit] = useState("0.0");
    const [error, setError] = useState("");
    const [pending, setPending] = useState("");
    const [success, setSuccess] = useState("");


    const format = (val:any) => val + ` GLQ`;
    const parse = (val:any) => val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1');

    async function doDeposit()
    {
        if (contract == null || tokenContract == null) { return }
        refreshBalance()

        const asNumber = parseFloat(amountDeposit)
        if (asNumber <= 0) {
            setError(`Invalid amount to deposit on the balance contract: ${asNumber} GLQ`)
            return 
        }
        
        const decimalAmount :any = utils.parseEther(amountDeposit)
        try {
            const allowance = await tokenContract.allowance(account, "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24");
            const wei = utils.parseEther('10000000')
            if (parseFloat(allowance) < parseFloat(decimalAmount)) {
                console.log(`${allowance} vs ${decimalAmount}`)
                setPending("Allowance pending, please allow the use of your token balance for the contract...")
                const approveTx = await tokenContract.approve("0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24", wei.toString());
                setPending("Waiting for confirmations...")
                await approveTx.wait()
                setPending("Allowance successfully increased, waiting for deposit transaction...")
            }
            const currentBalanceDecimal : any = utils.parseEther(balance.amount.toString())
            if (parseFloat(decimalAmount) > parseFloat(currentBalanceDecimal)) {
                setPending(""); setError(`You only have ${balance.amount} GLQ in your wallet.`);
                return;
            }

            setPending("Pending, check your wallet extension to execute the chain transaction...")
            const result = await contract.addBalance(decimalAmount.toString())
            setPending("Waiting for confirmations...")
            await result.wait()
            setSuccess(result.hash)

            refreshBalanceContract()
        }
        catch (e)
        {
            console.error(e)
            if (e.data?.message) { setPending(""); setError(`Error: ${e.data?.message}`);return; }
            if (e.message) { setPending(""); setError(`Error: ${e.message}`); }
        }
    }

    return (
        <Modal isOpen={props.depositModalVisible} onClose={props.setDepositModalVisible} size={'lg'}>
          <Modal.Content maxH="350" borderRadius="15">
            <Modal.CloseButton/>
            <Modal.Header bg="darkBlue.900" borderColor={"darkBlue.900"} h='60' py='3'><Text color="white" textAlign={"center"} fontSize="xl">Cloud Balance Deposit</Text></Modal.Header>
            <Modal.Body bg="rgb(32,27,64)" alignItems={"center"} justifyContent='center' >
                {error &&
                  <View  flexDirection='row' justifyContent='center' alignItems='center' bg='#3e2f70' borderRadius={'32'} p='3' my='1'>
                    <Icon as={FontAwesome} name="times-circle" color='#ff294c'  size='sm' mr='2'/>
                    <Text color="white" fontSize={'xs'}>{error}</Text>
                  </View>
                }
                {!success && pending &&
                  <View  textAlign='center' flexDirection='row' justifyContent='center' alignItems='center'  bg='#3e2f70' borderRadius={'32'} p='3' my='1'>
                    <Icon as={FontAwesome} name="info-circle" color='rgb(32,27,64)'  size='sm' mr='2'/>
                    <Text color="white" fontSize={'xs'}>{pending}</Text>
                  </View>
                }
                {success &&
                  <View textAlign='center' flexDirection='column' justifyContent='center' alignItems='center' bg='#3e2f70' borderRadius={'32'} p='3' my='1'>
                    <Icon as={FontAwesome} name="check-circle" color='#59b819' size='2xl' mr='2'/>
                    <Text color='white' fontSize={'xs'}>Deposit successfully completed !
                      <br/><small>Transaction hash : <a href={`https://etherscan.com/tx/${success}`} target="_blank">{success}</a></small></Text>
                  </View>
                }
              
                <Box bg="black" borderRadius={"32"} mx="3" flexDirection={"row"} alignItems="center" justifyContent={"space-between"} w="90%">
                  <Text color="white" fontSize={"xl"} ml="5">{depositNum} GLQ</Text>
                  <Box flexDirection={"column"} borderLeftColor={"rgb(32,27,64)"} borderLeftWidth="1">
                    <IconButton variant={"ghost"} borderTopRightRadius="32" h="5" w="7"
                    icon={<Icon as={Ionicons} name="caret-up" /> } 
                    _icon={{color:"rgb(32,27,64)", size:"sm"}}
                    _pressed={{backgroundColor:"white"}}
                    onPress={() => { setDepositNum((parseFloat(depositNum)+0.1).toString()); setAmountDeposit(parse(depositNum))}}
                    />
                    <IconButton borderLeftColor={"rgb(32,27,64)"}  variant={"ghost"} borderBottomRightRadius="32" h="5" w="7"
                    icon={<Icon as={Ionicons} name="caret-down" />} 
                    _icon={{color:"rgb(32,27,64)", size:"sm"}}
                    _pressed={{backgroundColor:"white"}}
                    onPress={() => { if(parseFloat(depositNum) >= 0.1) { setDepositNum((parseFloat(depositNum)-0.1).toString()); setAmountDeposit(parse(depositNum))}}}
                    />
                  </Box>
                </Box>

                <Pressable mt="5" onPress={doDeposit} w='70%' justifyContent={'center'} alignItems='center' alignSelf={'center'}> 
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
                        <View mx='10' style={{borderRadius:32}}  justifyContent="center" p="2" alignItems={'center'} textAlign='center'>
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