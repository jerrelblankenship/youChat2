import React from 'react'
import { Text } from 'react-native'

export default function Heading(props: any) {
    return (
        <Text style={{color:'#000000', fontSize: 32, lineHeight: 40, fontWeight: 'bold' }}>
            {props.content}
        </Text>
    )
}
