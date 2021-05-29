import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
  Animated
} from 'react-native'
import Swiper from './Swiper'
import size from './assert/size'
import color from './assert/color'
import Carousel from 'react-native-banner-carousel';
const ImageSlide = forwardRef((props, ref) => {
  const [listImage, setListImage] = useState(new Array)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    setListImage(props.listImage)
  })
  useEffect(() => {
    setIndex(1)
  })

  useImperativeHandle(ref, () => ({

  }))
  return (
    <View>
      <View style={styles.container}>
        <Carousel
          autoplay
          autoplayTimeout={3000}
          loops
          showsPageIndicator={true}
          pageIndicatorContainerStyle={{
            right: 0,
          }}
          pageIndicatorStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: color.primaryMedium,
          }}
          activePageIndicatorStyle={{
            backgroundColor: color.primaryMedium
          }}
          style={styles.wrapper}
        >
          {listImage.map((item, index) =>
            <View style={styles.slide} key={index}>
              <Image
                // defaultSource={require('./image/default-image.png')}
                resizeMode='cover'
                // source={item}
                source={{ uri: item }}
                style={{
                  width: width,
                  height: (210 / 414) * width
                }}
              />
            </View>
          )
          }
        </Carousel>
      </View>
      {/* <Swiper
        {...props}
        style={styles.wrapper}
        dotStyle={{
          borderWidth: 1,
          borderColor: '#007AFF',
          backgroundColor: '#ffffff'
        }}
      >

     
      </Swiper> */}

    </View >
  )

})


ImageSlide.defaultProps = {
  backgroundColor: '#ffffff'
}

export default ImageSlide

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: (9 / 16) * width
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})