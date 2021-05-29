import React, { Component, useState, createRef, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native'
import size from '../common/assert/size'
import color from '../common/assert/color'
import image from '../common/image/index'

const SearchBar = (props) => {
  const [value, setValue] = useState('')
  let textField = createRef()
  useEffect(() => {
    if (props.autoFocus) {
      textField.focus()
    }
    return () => {
    }
  }, [])
  return (
    <View
      style={[{
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: size.s35,
        marginHorizontal: size.s20
      }, props.style]}
    >
      <Image
        source={image.ic_search}
        style={{
          height: size.s30,
          width: size.s30,
          marginLeft: size.s30,
          marginRight: size.s20,
          tintColor: props.iconColor
        }}
      />

      <TextInput
        ref={(input) => { textField = input; }}
        placeholder={props.placeholder}
        style={{
          flex: 1,
          fontSize: size.s30,
          paddingVertical: size.s15,
          width: '100%',
          color: color.text,
        }}
        value={value}
        onFocus={() => {
          props.onFocus()
        }}
        onChangeText={(text) => {
          props.onChangeText(text)
          setValue(text)
        }}
      />
      {
        value !== '' &&
        <TouchableOpacity
          onPress={() => {
            props.onChangeText('')
            setValue('')
          }}
          style={{
            marginHorizontal: size.s10,
            backgroundColor: color.placeholder,
            padding: size.s10,
            borderRadius: size.s25
          }}>
          <Image
            source={image.ic_multiply}
            style={{
              height: size.s20,
              width: size.s20,
            }}
          />
        </TouchableOpacity>
      }
    </View>
  )
}

SearchBar.defaultProps = {
  onChangeText: (text) => { },
  onFocus: () => { },
  placeholder: 'Tìm kiếm sản phẩm'
}

export default SearchBar