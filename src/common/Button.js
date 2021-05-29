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

const Button = forwardRef((props, ref) => {
  let {
    label,
    icon,
    backgroundColor,
    style,
    textStyle,
    iconRight,
    iconLeft,
  } = props

  const [disable, setDisable] = useState(props.disable)

  useEffect(() => {
    console.log(props.disable)
    setDisable(props.disable)
  }, [props.disable])

  return (
    <TouchableOpacity
      style={[{
        backgroundColor: props.disable ? '#ccc' : backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: size.s30,
        opacity: 1
      }, style]}
      onPress={() => {
        if (!props.disable) {
          props.onPress()
        }
      }}
    >
      {
        iconLeft !== undefined &&
        <Image
          resizeMode='contain'
          source={iconLeft}
          style={{
            width: size.s30,
            height: size.s30,
            marginHorizontal: size.s15
          }}
        />
      }
      <Text style={[{
        paddingVertical: size.s10,
        color: color.text,
        fontSize: size.s30,
        paddingLeft: iconLeft === undefined ? size.s30 : size.s0,
        paddingRight: iconRight === undefined ? size.s30 : size.s0,
        fontWeight: '500',
        fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
      }, textStyle]}>{label}</Text>

      {
        iconRight !== undefined &&
        <Image
          resizeMode='contain'
          source={iconRight}
          style={{
            width: size.s30,
            height: size.s30,
            marginHorizontal: size.s20
          }}
        />
      }
      {/* {
        disable &&
        <View style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.5,
          backgroundColor: '#ffffff'
        }} />
      } */}
    </TouchableOpacity>
  )
})

Button.defaultProps = {
  label: 'Button',
  backgroundColor: color.informationMedium,
  onPress: () => { },
  disable: false
}
export default Button


