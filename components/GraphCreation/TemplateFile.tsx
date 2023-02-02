import React from 'react'
import { FormControl, Alert} from 'native-base'

interface TemplateFileProps {
    file: File
    name: string
}

export const TemplateFile: React.FC<TemplateFileProps> = (props: TemplateFileProps) => {

    return (
        <>
            <FormControl isRequired>
                <Alert status="info">
                    <i className="fal fa-info-circle"></i> 
                    <p>You're about to deploy a new graph named "{props.name}" based on the file {props.file.name} you uploaded,
                    it will be directly launched with the STARTING state over the Engine.</p>
                </Alert>
            </FormControl>
        </>
    )
}