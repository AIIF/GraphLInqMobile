import React from 'react'
import { Box } from 'native-base';

interface MainProps {

}

export const Main: React.FC<MainProps> = ({ children }) => {

    return (
        <Box  h="full" overflowY="auto">
            { children }
        </Box>
    );
}