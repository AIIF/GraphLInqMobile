import { Center, Spinner } from 'native-base';
import React from 'react'

interface SuspenseSpinnerProps {

}

export const SuspenseSpinner: React.FC<SuspenseSpinnerProps> = ({ }) => {
    return (
        <Center h='15'>
            <Spinner
                color="#15122b"
                size={"15"}
            />
        </Center>
    );
}