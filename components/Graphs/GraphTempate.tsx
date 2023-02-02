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

import {  Linking } from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const graphTemplate =[{
    id: 1,
    name : "Watcher Coingecko Bitcoin Price Print",
    imgUrl : require("../../assets/GraphTemplate/y-bs.png")
  }, {
    id: 2,
    name : "Watcher Gas price From Ethereum Chain",
    imgUrl : require("../../assets/GraphTemplate/y-l-03.svg") //y-l-03.svg
  }, {
    id: 3,
    name : "Watch New Ethereum Blocks",
    imgUrl : require("../../assets/GraphTemplate/y-l-03.svg") //y-l-03.svg
  }, {
    id: 4,
    name : "Pancake Swap Pair Watcher",
    imgUrl : require("../../assets/GraphTemplate/y-l-02.svg") //y-l-02.svg
  }, {
    id: 5,
    name : "Watch Unicrypt New Deposit",
    imgUrl : require("../../assets/GraphTemplate/y-bs.png")
  }, {
    id: 6,
    name : "Watch Unicrypt Presale Telegram",
    imgUrl : require("../../assets/GraphTemplate/y-l-01.svg") //y-l-01.svg
  } 
];

const GraphTemplate = (props : any) => {
    const [buttonVisible, setButtonVisible]= React.useState(false);
    const [nextButtonEnable, setNextButtonEnable] = useState(false);
    const [graphName, setGraphName] = useState('');
    const [templateID, setTemplateID] = useState(0);

    return (
        <Box justifyContent={"center"} flexDirection={"column"} bg="rgb(32,27,64)" borderRadius="12" px={["7","10","15"]} py={["3","5","7"]} mb="5">
            <Box justifyContent={"left"} >
            <Text color="white" fontSize={"xl"} bold mb="3"> Name Your Graph:</Text>
            <Input variant="underlined" placeholder="Graph Name" color="rgb(136,127,164)" fontSize={"md"} mb="7" onChangeText={text => {setGraphName(text);}}/>
            <Text color="white" fontSize={"xl"} bold mb="2"> Templates:</Text>
            </Box>
            
            <ScrollView h="200">
            <FlatList numColumns={2} m="1" data={graphTemplate}
                renderItem={({
                item
                }) => {
                return <Pressable w="50%" p="1" onPress={() => { setButtonVisible(true); setTemplateID(item.id); if(graphName!='') { setNextButtonEnable(true);}}}>
                    {({isPressed,isFocused, }) => {
                    return <Box 
                    borderColor={isPressed?"rgb(7,125,255)": isFocused ? "rgb(7,125,255)" : "rgb(136,127,164)"} 
                    borderWidth="2" 
                    alignItems={"center"} style={{
                        borderRadius: 32,
                        alignContent: "center",
                    }}
                    bg="transparent"  h="100%"
                    >
                    <Image src={item.imgUrl} w="50" h="100" style={{resizeMode:"contain"}}/>
                    <Text color="rgb(136,127,164)" fontSize={"sm"} textAlign="center">{item.name}</Text>
                </Box>
                }}
                </Pressable>
            }} />
            </ScrollView>
            { buttonVisible?(
            <Center >
                <View m="2" w="80%">
              <Button borderRadius={"15"} variant={'outline'} m="1" ><Text color="rgb(136,127,164)" fontSize={"lg"} bold>Download.GLQ</Text></Button>
              <Button borderRadius={"15"} variant={'outline'}  m="1" onPress={() => {Linking.openURL("https://ide.graphlinq.io");}}><Text bold color="rgb(136,127,164)" fontSize={"lg"}>Edit on IDE</Text></Button>
              <Button borderRadius={"15"} variant={'solid'} disabled={!nextButtonEnable} color={nextButtonEnable===true?"rgb(7,0,100)":"rgb(7,125,255)"}  m="1" onPress={() => {props.onMainContentTypeChanged('graphDetail'); props.onGraphNameChanged(graphName); props.onTemplateIDChanged(templateID);}}><Text color="white" bold fontSize={"lg"}>Next</Text></Button>
              </View>
            </Center>
            
            ) : null}
      </Box>
    )
};

export default GraphTemplate;