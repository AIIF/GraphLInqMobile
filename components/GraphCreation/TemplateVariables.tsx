import React from 'react'
import { FormControl,Input, Text} from 'native-base'

interface TemplateVariablesProps {
}

export const TemplateVariables: React.FC<TemplateVariablesProps> = ({ }) => {

    const firstFieldRef = React.useRef(null)

    return (
        <>
            <FormControl isRequired>
                <Text>Binance API Key</Text>
                <Input focusBorderColor="brand.400" type="text" />
                {/* <FormHelperText>additionnal informations</FormHelperText> */}
            </FormControl>
            <FormControl isRequired>
                <Text>Smart Contract Address</Text>
                <Input focusBorderColor="brand.400" type="text" />
            </FormControl>
        </>
    )
}