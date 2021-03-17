import React from 'react'
import {HeaderButton} from "react-navigation-header-buttons"
import {Ionicons} from "@expo/vector-icons"
import {Platform} from 'react-native'
import Colors from '../constants/colors'

const CustomHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            size={23}
            IconComponent={Ionicons}
            color={Platform.OS === 'android' ? '#fff' : Colors.mainColor}
        />
    )
}

export default CustomHeaderButton
