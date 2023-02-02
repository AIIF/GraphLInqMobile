import React from 'react'
import { Box, Image, View} from 'native-base';
import TemplateLogo from "../../assets/radio/r-02.svg"
import TemplateLogoSelect from "../../assets/radio/r-03.svg"

interface TemplateCardProps {
    TemplateImageUrl: string,
    TemplateImageAlt: string,
    TemplateTitle: string,
}

export const TemplateCard: React.FC<TemplateCardProps> = (props) => {

    return (
        <>
            {props.TemplateImageUrl == "none"
                ? <View mt="0" mx="auto" mb="10" width="50" height="50">
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
                    {props.TemplateTitle}
                </View>
                : <>
                    <Box textAlign="center">
                        <Image m="auto" h="100" src={props.TemplateImageUrl} />
                        {props.TemplateTitle}
                    </Box>
                </>
            }
        </>
    );
}