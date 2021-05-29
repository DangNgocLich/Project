import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView
} from 'react-native'

import size from '../common/assert/size'
import color from '../common/assert/color'
import image from '../common/image/index'

const HeaderIcon = (props) => {

  return (
    <TouchableOpacity
      style={{
        borderRadius: size.s60,
        marginHorizontal: size.s10,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: props.icon === '' ? 'transparent' : '#ffffff',
        padding: size.s15,
        
      }}
      onPress={() => {
        props.onPress();
      }}
    >
      <Image
        resizeMode="contain"
        source={props.icon}
        style={{
          width: size.s35,
          height: size.s35,
        }}
      />
    </TouchableOpacity>
  )

}


HeaderIcon.defaultProps = {
  onPress: () => {

  },
  icon: ''
}

export default HeaderIcon
