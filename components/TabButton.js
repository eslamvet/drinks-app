import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'

export default function TabButton({label,labelStyle,selected,onPress,containerStyle}) {
  return (
    <TouchableOpacity style={{paddingVertical:SIZES.base,paddingLeft:SIZES.radius,paddingRight:SIZES.padding,borderBottomWidth:selected ? 4 : 2,borderBottomColor:selected ? COLORS.primary : COLORS.gray,...containerStyle}} onPress={onPress}>
      <Text style={{...FONTS.h2,fontWeight:'600',fontSize:20,color:selected ? COLORS.primary : COLORS.gray,...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})