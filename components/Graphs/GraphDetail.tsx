import React,{ReactChildren, useState} from "react";
import {
  Text,
  HStack,
  NativeBaseProvider,
  Box,
  Pressable,
  View,
  IconButton,
  Icon,
  VStack,
  FormControl,
  Input,
  Button
} from "native-base";


const graphDetails = {
    template: [
        "Watcher Coingecko Bitcoin Price Print",
        "Watcher Gas price From Ethereum Chain",
        "Watch New Ethereum Blocks",
        "Pancake Swap Pair Watcher",
        "Watch Unicrypt New Deposit",
        "Watch Unicrypt Presale Telegram"
    ],
    description: [
        'Watch over bitcoin price on Coingecko and print result',
        'Watch ethereum gas price in real time',
        'Watch events from every new blocks received on the Ethereum Chain',
        'Watch over a pair on pancake and get notified on new swaps',
        'Watch new deposit on UniCrypt platform',
        'Watch activities on a specific presale from Unicrypt and report to Telegram',
    ],
    templateParams: [
        {
            title: 'Watch Interval (in seconds)',
            value: '300'
        },
        {
            title: 'Symbol to watch',
            value: 'bitcoin'
        },
        {
            title: 'Log Message',
            value: 'Bitcoin price is {0}$ for 24h change of {1}'
        },
        {
            title: 'Message variable (Price)',
            value: '{0}'
        },
        {
            title: 'Message variable (MarketCap Change 24h)',
            value: '{1}'
        },
    ]
};

const graphDetail = (props:any) => {
    return (
         <VStack justifyContent={"center"} bg="rgb(32,27,64)" borderRadius="12" px={["7","10","15"]} py={["3","5","7"]} mb="5">
            <Text color="white" fontSize={"xl"} bold mb="3"> {props.graphName}:</Text>
            <Text color="rgb(136,127,164)" fontSize={"lg"} mb="3">Template: {graphDetails.template[props.templateID]}</Text>
            <Text color="rgb(136,127,164)" fontSize={"lg"} mb="3">Description: {graphDetails.description[props.templateID]}</Text>
            {graphDetails.templateParams.map((element) => {
                return (
                    <VStack mb="3">
                        <FormControl isRequired>
                            <FormControl.Label color="rgb(136,127,164)" fontSize={"lg"}>{element.title}</FormControl.Label>
                            <Input variant={"underlined"} color="rgb(136,127,164)" fontSize={"md"} value={element.value} />
                        </FormControl>
                    </VStack>
                );
            })
            }
            <HStack justifyContent={"right"} my="5">
                <Button variant={"outline"} borderRadius="12" borderColor={"rgb(136,127,164)"} mr="3" onPress={() => {props.onMainContentTypeChanged('graphTemplate');}}>
                    <Text color="rgb(136,127,164)" fontSize={"md"} bold >Previous</Text>
                </Button>
                <Button variant={"solid"} borderRadius="12">
                    <Text color="white" fontSize={"md"} bold>Deploy</Text>
                </Button>
            </HStack>
        </VStack>
    )
};

export default graphDetail;