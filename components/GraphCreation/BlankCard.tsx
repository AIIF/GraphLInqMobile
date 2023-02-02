import React, {useEffect} from 'react'
import { Box,Icon, Flex, View, Image} from 'native-base';
import {useRadio} from '@react-native-aria/radio';
import { FiFile } from 'react-icons/fi';
import TemplateLogo from "../../assets/radio/r-01.svg"
import TemplateLogoSelect from "../../assets/radio/r-04.svg"

interface BlankCardProps {

}

export const BlankCard: React.FC<BlankCardProps> = (props) => {

    return (
         <>
            <View mt="0" mx="auto" mb="10" width="50" height="50">
                <Box
                    display={"none"}
                    h="50"
                    maxH="50"
                    justifyContent={"center"}
                    alignItems="center">
                    <Image  w="50" h='50' src={"url('" + TemplateLogo + "')"}/>
                </Box>
                <Box
                    display={"block"}
                    h="50"
                    maxH="50"
                    justifyContent={"center"}
                    alignItems="center">
                    <Image w="50" h='50' src={"url('" + TemplateLogoSelect + "')"}/>
                </Box>
                Blank
            </View>
        </> 
    );
}