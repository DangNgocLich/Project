import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native'
import SearchBar from './SearchBar'
import size from '../common/assert/size'
import color from '../common/assert/color'
import image from '../common/image/index'

const RadioGroup = (props) => {
  const [selectedItem, setSelectedItem] = useState(new Array)
  const {
    itemList,
    multiple,
    onSelectItem
  } = props
  useEffect(() => {
    onSelectItem(selectedItem)
  }, [selectedItem])



  return (

    <View
      style={{
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 10,
        // },
        // shadowOpacity: 0.51,
        // shadowRadius: 13.16,

        // elevation: 20,
        paddingVertical: size.s10
      }}
    >
      {
        itemList.map((item, key) => {
          let textColor = props.textColor
          if (props.textColor !== undefined) {
            selectedItem.map(ele => {
              if (ele.id === item.id) {
                textColor = props.activeText
              }
            })
          }
          return (
            <TouchableWithoutFeedback
              onPress={async () => {
                if (!multiple) {
                  await setSelectedItem([item])
                }

              }}>
              <View
                key={key}
                style={[{
                  flexDirection: 'row',
                  paddingVertical: size.s10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }, props.itemStyle]}>
                <Text style={[{
                  fontSize: size.s30,
                  fontWeight: '500',
                  fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                  color: textColor
                }, props.labelStyle]}>{item.label}</Text>
                {
                  props.dotView !== undefined ?
                    props.dotView(item) :
                    <View style={{
                      width: props.buttonSize,
                      borderRadius: size.s40,
                      borderWidth: size.s5 * 1.3,
                      aspectRatio: 1,
                      borderColor: props.color,
                      marginHorizontal: size.s20,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {
                        selectedItem.map(ele => {
                          if (ele.id === item.id) {
                            return (
                              <View
                                style={[{
                                  backgroundColor: props.color,
                                  width: props.buttonSize / 2.5,
                                  borderRadius: size.s20,
                                  aspectRatio: 1
                                }]}
                              />
                            )
                          }
                        })
                      }

                    </View>
                }

              </View>
            </TouchableWithoutFeedback>
          )
        })
      }
    </View>
  )

}


RadioGroup.defaultProps = {
  multiple: false,
  itemList: [],
  onSelectItem: () => { },
  color: color.primaryMedium,
  textColor: color.primaryBold,
  activeText: color.primaryBold,
  buttonSize: size.s35
}

export default RadioGroup
