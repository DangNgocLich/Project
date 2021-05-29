import React, { forwardRef, } from 'react'
import {
  View,
} from 'react-native'

const CustomBackground = forwardRef((props, ref) => {

  return (
    <View style={[{
      width: '100%',
      height: '100%',
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: props.backgroundColor,
      opacity: props.opacity
    }, props.style]} />
  )

})

CustomBackground.defaultProps = {
  backgroundColor: '#ffffff',
  opacity: 1
}

export default CustomBackground
