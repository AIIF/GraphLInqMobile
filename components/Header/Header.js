import React,{useState} from 'react';
import {Icon, Pressable, View, Text,Box,Modal} from 'native-base';
import {StyleSheet} from 'react-native';
import { Entypo,Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from "expo-linear-gradient";

export default function Header(props){
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const menuItems =[{
    id: 1,
    name : "book-outline",
    desc : "Documentation"
  }, {
    id: 2,
    name : "chatbubble-outline",
    desc : "Discord"
  }, {
    id: 3,
    name : "chatbox-outline",
    desc : "Telegram"
  }
]; 

  const navigation = useNavigation();
  return(
    <View style={headerStyles.container} py="2" px="3">
      <Modal isOpen={detailModalVisible} onClose={setDetailModalVisible} size={"lg"} borderRadius="32" >
        <Modal.Content maxH="250" borderRadius="15">
          <Modal.CloseButton />
            <Modal.Header bg="rgb(32,27,64)" borderColor={"transparent"}><Text color="rgb(136,127,164)" fontSize={"lg"}>More</Text></Modal.Header>
            <Modal.Body bg="darkBlue.900">
              {menuItems.map((item) => {
                return <Pressable key={item.name}> 
                {({isPressed}) => {
                  return <Box m="2" flexDirection={"row"} justifyContent="left" px="2" alignItems={"center"}  >
                    <Icon as={Ionicons} name={item.name} size="sm" color={"blue.900"}/>
                    <Text color="rgb(136,127,164)" fontSize={"md"} > {item.desc} </Text>
                  </Box>
                }}
              </Pressable>
            })}
          </Modal.Body>
        </Modal.Content>
      </Modal>

        <Pressable onPress={()=>navigation.toggleDrawer()} pr="1" >
        {({isPressed}) => {
          return <LinearGradient
            colors={['rgb(56,8,255)', 'rgb(7,125,255)']}
            start={[0,1]}
            end={[0,0]}
            style={{
              borderRadius: 32,
              alignContent: "center",
              justifyContent: "center",
              padding: 3
              }}>
              <View style={{
                flexDirection:"row",
                borderRadius:32,
                }}>
                <Entypo name="menu" size={30} color="white" />
              </View>
          </LinearGradient>
        }}
        </Pressable>
      <View justifyContent={"center"} flexDirection="row" alignItems={"center"}>
        <Box flexDirection={"column"} bg="black" alignItems={"center"} borderRadius="32" mr={"3"} px={["3","5","7","10"]} py={"2"}>
            <Text fontSize={["md","lg"]} color="rgb(136,127,164)">GLQ:</Text>
            <Text fontSize={["md","lg"]} color="rgb(136,127,164)" bold>$0.00000</Text>
          </Box>
        <Pressable onPress={()=> setDetailModalVisible(true)} >
          <Icon size="4xl" as={Ionicons} name={"ellipsis-vertical-circle-outline"} color="rgb(136,127,164)" />
        </Pressable>  
      </View>
    </View>
  )
}

const headerStyles=StyleSheet.create({
   container:{
       left:0,
       backgroundColor:'rgb(32,27,64)',
       display:'flex',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between'
   }
});