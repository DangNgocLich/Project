import React, { Component, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import size from '../common/assert/size'
import color from '../common/assert/color'
import image from '../common/image/index'
import CustomBackground from './CustomBackground'

const CheckBox = (props) => {
  const [isSelected, setIsSelected] = useState(props.isSelected)
  const {
    style,
    borderColor
  } = props
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // setIsSelected(!isSelected)
        props.onChangeSelected()
      }}>

      <View
        style={[{
          width: props.size,
          aspectRatio: 1,
          borderWidth: 2,
          borderColor: borderColor,
          borderRadius: size.s10,
          justifyContent: 'center',
          alignItems: 'center',
          margin: size.s10
        }, style]}

      >
        {
          (props.isSelected) &&
          <CustomBackground
            backgroundColor={borderColor}
            opacity={0.2}
            style={{ borderRadius: size.s10, }}
          />
        }
        {
          (props.isSelected) &&
          <Image
            resizeMode='contain'
            source={image.ic_tick}
            style={{
              width: props.size * 0.5,
              tintColor: borderColor
            }}
          />
        }


      </View>
    </TouchableWithoutFeedback>
  )
}

CheckBox.defaultProps = {
  borderColor: color.secondaryBold,
  isSelected: false,
  size: size.s55,
  onChangeSelected: () => { }
}

export default CheckBox