import React,{ReactChildren, useState} from "react";
import {
  Text,
  VStack,
  Pressable,
  Icon,
  Menu,
} from "native-base";

import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

const MoreButton = (props: any) => {
    const [shouldOverlapWithTrigger] = React.useState(false);
  
    return <VStack space={6} alignSelf="flex-start" w="100%" pr="1" >
        <Menu bg="rgb(32,27,64)" w="160" shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
      placement={"bottom right"} focusable="false" trigger={triggerProps => {
        return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps} >
              <Icon size="4xl" as={Ionicons} name={"ellipsis-vertical-circle-outline"} color="rgb(136,127,164)" />
            </Pressable>   
        );
        }}>
        {props.menuItems.map((element : any) => {
          return (
            <Menu.Item flexDirection={"row"} >
              <Icon size="md" as={Ionicons} name={element.name} color="rgb(56,8,255)" />
              <Text color="rgb(136,127,164)"> {element.desc}</Text> 
            </Menu.Item>
          )
        })}  
        </Menu>
      </VStack>;
  }

  export default MoreButton;