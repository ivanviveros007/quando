import {FC} from 'react'
import {View} from 'react-native'
import { ThemedText } from '../ThemedText'

interface CardProps{}

export const CardEvent:FC<CardProps>=({})=>{
    return(
        <View>
        <ThemedText>Card para Eventos</ThemedText>
        </View>
    )
}