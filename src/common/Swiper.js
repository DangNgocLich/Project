import React, { useState, forwardRef, useEffect, useImperativeHandle, useLayoutEffect } from 'react'
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import size from './assert/size'
import color from './assert/color'


const Swiper = forwardRef((props, ref) => {
  const [index, setIndex] = useState(0)
  const {
    auto,
    listImage,
    time
  } = props
  // useEffect(() => {
  //   setIndex(1)

  // }, [])
  // useEffect(() => {
  //   setTimeout(async () => {
  //     if (index === listImage.length - 1) {
  //       await setIndex(0)
  //     } else {
  //       await setIndex(index + 1)
  //     }
  //     this.scrollView.scrollTo({
  //       x: index * Dimensions.get('window').width,
  //       y: 0,
  //       animated: true
  //     })
  //   }, time)
  // })

  return (
    <View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={ref => { this.scrollView = ref }}
        onLayout={() => {
          this.scrollView.scrollTo({
            x: props.index * Dimensions.get('window').width,
            y: 0,
            animated: false
          })
        }}
        // onScroll={(event) => {
        //   console.log(event.nativeEvent.contentOffset.x)
        //   var data = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
        //   if (data === listImage.length - 1) {
        //     setIndex(0)
        //     var time = props.time
        //     clearTimeout(this.setti)
        //   } else {
        //     setIndex(data + 1)
        //   }
        // }}
        scrollEnabled={false}
        pagingEnabled={true}
        style={props.style}
      >
        {props.children}
      </ScrollView>
      <View style={{
        flex: 1,
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingVertical: size.s15,
        paddingHorizontal: size.s20,
        flexDirection: 'row'
      }}>
        {
          listImage.map((item, key) => {
            return <DotView key={key} isSelected={
              (key === index - 1 && index !== listImage.length) ||
                (key === listImage.length - 1 && index === 0)
                ? true
                : false} />
          })
        }

      </View>
    </View>

  )

})

Swiper.defaultProps = {
  index: 0
}

export default Swiper



const DotView = (props) => {
  return (
    <View style={{
      width: size.s20,
      borderRadius: size.s20,
      aspectRatio: 1,
      borderWidth: 1.5,
      backgroundColor: props.isSelected ? color.primaryMedium : 'transparent',
      borderColor: color.primaryMedium,
      marginHorizontal: size.s5,

    }}>

    </View>
  )
}
