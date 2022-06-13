import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

export default function CustomButton({label,labelStyle,containerStyle,onPress,primary,secondary}) {
  return (
    <TouchableOpacity onPress={onPress} style={{paddingVertical:SIZES.base,paddingHorizontal:SIZES.radius,backgroundColor:primary ? COLORS.primary : null ,borderWidth:secondary ? 1 : 0,borderColor:secondary ? COLORS.primary : null,borderRadius:20,...containerStyle}}>
      <Text style={{...FONTS.h3,color:primary ? COLORS.white : COLORS.primary,...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  )
}
