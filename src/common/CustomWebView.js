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
  ScrollView,
} from 'react-native'
import color from './assert/color'
import size from './assert/size'
import { WebView } from 'react-native-webview'
import Header from './Header'
import Loading from './Loading'
const CustomWebView = forwardRef((props, ref) => {

  const [loading, setLoading] = useState(false)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Header
        {...props}
        listView={[
          { name: 'back' },
          { name: 'title', value: props.navigation.getParam('title') },
          { name: 'iconNull' },
        ]}
      />
      <View style={{ flex: 1 }}>
        {loading && <Loading />}

        <WebView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          containerStyle={{ width: "100%" }}
          // onLoad={() => {
          //   setLoading(true)
          // }}
          source={{
            uri: props.navigation.getParam('link'),
          }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  )

})

CustomWebView.defaultProps = {
  backgroundColor: '#ffffff',
  opacity: 1
}

export default CustomWebView
