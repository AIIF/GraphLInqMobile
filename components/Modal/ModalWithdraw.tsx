import React,{useState, useEffect} from 'react';
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
  Stack
} from 'native-base';

import { StyleSheet, SafeAreaView, Linking} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { FiArrowDownLeft } from 'react-icons/fi';
import { useActiveWeb3React } from '../../hooks';
import WalletService from '../../services/walletService';
import { ResponseSuccess } from '../../providers/responses/success';
import { useWalletContract } from '../../hooks/useWalletContract';

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const ModalWithdraw = (props:any) => {
    const [depositNum, setDepositNum] = useState("0.0");

    const { isOpen, onOpen, onClose } = useDisclose()
    const finalRef = React.useRef()
    const { account } = useActiveWeb3React()
    const [dueBalance, setDueBalance] = useState(0)
    const [amountWithdraw, setAmountWithdraw] = useState("0.0");
    const [error, setError] = useState("");
    const [pending, setPending] = useState("");
    const [success, setSuccess] = useState("");

    const {refreshBalanceContract} =  useWalletContract();

    const format = (val: string) => val + ` GLQ`;
    const parse = (val: string) => val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1');

    useEffect(() => {
        const getCloudBalance = async () => {
            try {
                const result = await WalletService.getBalance(account ?? "")
                if (result?.due_balance) {
                    setDueBalance(result.due_balance)
                }
            } catch (e) {
                console.error(e)
            }
        }
        getCloudBalance()
    }, [account])

    async function doWithdraw()
    {
        const asNumber: number = parseFloat(amountWithdraw)
        if (asNumber <= 0) {
            setError(`Invalid amount to withdraw from the balance contract: ${asNumber} GLQ`)
            return 
        }

        setPending("Pending, waiting for server response...")
        const result: ResponseSuccess | String = await WalletService.withdraw(asNumber)
        if (result instanceof String) {
            setPending(""); setError(result.toString());
            return;
        }
        if (result.success) {
            setPending("")
            setError("")
            setSuccess(result.hash)
        }

        setTimeout(() => {
            refreshBalanceContract()
        }, 1000)
    }

    return (
        <Modal isOpen={props.withdrawModalVisible} onClose={props.setWithdrawModalVisible} size={"lg"}  >
          <Modal.Content maxH="450" borderRadius="15">
            <Modal.CloseButton/>
            <Modal.Header bg="darkBlue.900" borderColor={"darkBlue.900"}><Text color="white" textAlign={"center"} fontSize="xl">Cloud Balance Deposit</Text></Modal.Header>
            <Modal.Body bg="rgb(32,27,64)" alignItems={"center"} justifyContent='center'>
              <Stack m='1'>
                {error &&
                  <View  textAlign='center' flexDirection='row' justifyContent='center' alignItems='center' bg='#3e2f70' borderRadius={'32'} p='3' my='1'>
                    <Icon as={FontAwesome} name="times-circle" color='#ff294c'  size='md' mr='2'/>
                    <Text color="white" fontSize={'sm'}>{error}</Text>
                  </View>
                }
                {!success && pending &&
                  <View  textAlign='center' flexDirection='row' justifyContent='center' alignItems='center'  bg='#3e2f70' borderRadius={'32'} p='3' my='1'>
                    <Icon as={FontAwesome} name="info-circle" color='rgb(32,27,64)' size='md' mr='2'/>
                    <Text color="white" fontSize={'sm'}>{pending}</Text>
                  </View>
                }
                {success &&
                  <View textAlign='center' flexDirection='row' justifyContent='center' alignItems='center'  bg='#3e2f70' borderRadius={'32'} p='3' my='1'>
                    <Icon as={FontAwesome} name="check-circle" color='#59b819' size='md' mr='2'/>
                    <Text color='white'>Deposit successfully completed ! </Text>
                    <Text color='white'><small>Transaction hash : <a href={`https://etherscan.com/tx/${success}`} target="_blank">{success}</a></small></Text>
                  </View>
                }
                <View textAlign='center' flexDirection='column' justifyContent='center' alignItems='center' bg='#3e2f70' borderRadius={'32'} p='3' m='2'>
                  <Icon as={FontAwesome} name="info-circle" color='darkBlue.900' size='2xl'/>
                  <Text color='white'>You currently have <b>{dueBalance} GLQ</b> of execution cost from executed graphs to burn.</Text>
                </View>
                <Box bg="black" borderRadius={"32"} mx="3" flexDirection={"row"} alignItems="center" justifyContent={"space-between"} w="90%">
                <Text color="white" fontSize={"xl"} ml="5">{depositNum} GLQ</Text>
                <Box flexDirection={"column"} borderLeftColor={"rgb(32,27,64)"} borderLeftWidth="1">
                  <IconButton variant={"ghost"} borderTopRightRadius="32" h="5" w="7"
                  icon={<Icon as={Ionicons} name="caret-up" /> } 
                  _icon={{color:"rgb(32,27,64)", size:"sm"}}
                  _pressed={{backgroundColor:"white"}}
                  onPress={() => { setDepositNum((parseFloat(depositNum)+0.1).toString());}}
                  />
                  <IconButton variant={"ghost"} borderBottomRightRadius="32" h="5" w="7"
                  icon={<Icon as={Ionicons} name="caret-down" />} 
                  _icon={{color:"rgb(32,27,64)", size:"sm"}}
                  _pressed={{backgroundColor:"white"}}
                  onPress={() => { if(parseFloat(depositNum) >= 0.1) {setDepositNum((parseFloat(depositNum)-0.1).toString());}}}
                  />
                </Box>
                </Box>
                
                <Pressable mt="5" onPress={doWithdraw} w='70%' justifyContent={'center'} alignItems='center' alignSelf={'center'}> 
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
                          <Text textAlign={"center"} color="white" fontSize={"sm"} bold>Withdraw</Text>
                        </View>
                    </LinearGradient>
                    }}
                </Pressable>
              </Stack>
              
            </Modal.Body>
          </Modal.Content>
      </Modal>
    );
};

export default ModalWithdraw;