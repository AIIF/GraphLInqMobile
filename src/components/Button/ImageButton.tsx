import React, {useState} from "react";
import {Image, Pressable, Text, View} from "native-base";
import {LinearGradient} from "expo-linear-gradient";


const ImageButton: React.FC = ( 
    props: any
) : JSX.Element=> {
    const [pressed,setPressed] = useState(false);
    return (
        <Pressable  onPress={() => {
            setPressed(true);
            props.onMetaMaskConnect();
        }}>
            {({isHovered, isPressed,isFocused}) => {
                return <LinearGradient
                    colors={['rgb(56,8,255)', 'rgb(7,125,255)']}
                    start={[0,1]}
                    end={[0,0]}
                    style={{
                        borderRadius: 32,
                        alignContent: "center",
                        justifyContent: "center",
                        padding: 3,
                        transform: [{scale: isPressed ? 0.96 : 1}]
                    }}
                >
                    <View style={{
                        flexDirection:"row",
                        borderRadius:32,
                    }}
                          justifyContent="space-between"
                          bg={isPressed? "darkBlue.900" :"#15122b"}
                          px={["5","10","30","50"]}
                          py={"2"}>
                        <Text fontSize={["xl","2xl","3xl","4xl"]} color="#aba1ca"> {props.label}</Text>
                        <Image src={props.btnimg} style={{resizeMode:"contain"}} w={["6","8","10","12"]} h="full" ></Image>
                    </View>
                </LinearGradient>
            }}
        </Pressable>
    )
}

export default ImageButton;