import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'
import size from '../common/assert/size'
import color from '../common/assert/color'
import image from '../common/image/index'

const FloatingButton = forwardRef((props, ref) => {
  let {
    label,
    icon,
    backgroundColor,
    style,
    textStyle,
  } = props
  return (
    <TouchableOpacity
      style={[{
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: size.s90,
         position: 'absolute',
         bottom:20,right:20
      }, style]}
    >
      {
        icon !== undefined &&
        <Image
          resizeMode='contain'
          source={icon}
          style={{
            width: size.s70,
            height: size.s70,
            marginHorizontal: size.s15
          }}
        />
      }
    </TouchableOpacity>
  )
})

FloatingButton.defaultProps = {
  label: 'Button',
  backgroundColor: color.informationMedium
}
export default FloatingButton


