import React, { Component, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native'
import HeaderIcon from '../common/HeaderIcon'
import SearchBar from './SearchBar'
import size from '../common/assert/size'
import color from '../common/assert/color'
import image from '../common/image/index'
import { userProfile } from '../boston_sale/config/settings'
import PersonalPage from '../boston_delivery/components/personalPage/PersonalPage'

const Header = (props) => {
  const { listView } = props
  const [modalVisible, setModalVisible] = useState(false)
  renderItem = (item) => {
    switch (item.name) {
      case 'search':
        return <SearchBar
          autoFocus={(item.autoFocus === undefined || item.autoFocus === false) ? false : true}
          onFocus={() => {
            item.onFocus === undefined ?
              props.navigation.navigate('SearchProductContainer') :
              item.onFocus()
          }}
          onChangeText={(text) => {
            item.onChangeText(text)
          }}
        />
      case 'notification':
        return (
          <TouchableOpacity onPress={() => {
            item.action === undefined ?
              props.navigation.navigate('NotificationList') :
              item.action()
          }}>
            <HeaderIcon
              {...this.props}
              icon={image.ic_notification}
              onPress={() => {
                item.action === undefined ?
                  props.navigation.navigate('NotificationList') :
                  item.action()
              }}
            />
            {
              parseInt(props.responseGetNotificationCount) > 0 &&
              <View style={{
                position: 'absolute',
                top: -3,
                right: -3,
                backgroundColor: color.dangerMedium,
                borderRadius: size.s40,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: "center",
                minWidth: size.s40,
                minHeight: size.s40,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: size.s20,
                  paddingHorizontal: size.s5
                }}>
                  {props.responseGetNotificationCount}
                </Text>
              </View>
            }
          </TouchableOpacity>

        )
      case 'cart':
        return (
          <TouchableOpacity onPress={() => {
            item.action === undefined ?
              props.navigation.navigate('Cart') :
              item.action()
          }}>
            <View>
              <HeaderIcon
                icon={image.ic_cart}
                onPress={() => {
                  item.action === undefined ?
                    props.navigation.navigate('Cart') :
                    item.action()
                }}
              />
            </View>
            {props.cartDatalog.counter != undefined && props.cartDatalog.counter !== 0 ?
              <View style={{
                position: 'absolute',
                top: -3,
                right: -3,
                backgroundColor: color.dangerMedium,
                borderRadius: size.s40,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: "center",
                minWidth: size.s40,
                minHeight: size.s40,
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: size.s20,
                  paddingHorizontal: size.s5
                }}>
                  {props.cartDatalog.counter}
                </Text>
              </View> : null
            }

          </TouchableOpacity>

        )
      case 'back': {
        return (
          <HeaderIcon
            icon={image.ic_back}
            onPress={() => {
              item.action === undefined ?
                props.navigation.goBack() :
                item.action()
            }}
          />
        )
      }
      case 'user': {
        return (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{
                borderRadius: size.s60,
                marginHorizontal: size.s10,
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: 'center',
                backgroundColor: userProfile.partnrType === 2 ? color.primaryRegular : '#ffffff',
                flexDirection: 'row'
              }}
              onPress={() => {
                if (item.disable !== undefined && !item.disable) {

                } else {
                  setModalVisible(true)
                }
              }}
            >
              <Image
                resizeMode="contain"
                source={userProfile.partnrType === 2 ? image.ic_hand : image.ic_user}
                style={{
                  width: size.s70,
                  height: size.s70,
                }}
              />
            </TouchableOpacity>

            {
              item.showUsername &&
              <Text style={{
                fontSize: size.s35 * 0.95,
                fontWeight: '700',
                textAlign: 'center',
                paddingHorizontal: size.s10
              }}>
                {userProfile.name}
              </Text>
            }
            <PersonalPage
              {...props}
              modalVisible={modalVisible}
              setModalVisible={(value) => { setModalVisible(value) }}
            />
          </View>

        )
      }
      case 'personalPage': {
        return (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <View
              style={{
                borderRadius: size.s60,
                marginHorizontal: size.s10,
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: 'center',
                backgroundColor: '#ffffff',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <Image
                  resizeMode="contain"
                  source={image.ic_user}
                  style={{
                    width: size.s70,
                    height: size.s70,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{
                fontSize: size.s35 * 0.95,
                fontWeight: '700',
                textAlign: 'center',
                paddingHorizontal: size.s10
              }}>
                {userProfile.name}
              </Text>
              <Text style={{
                fontSize: size.s30,
                fontWeight: '600',
                paddingHorizontal: size.s10
              }}>{userProfile.taxCode}</Text>
            </View>

          </View>

        )
      }
      case 'title': {
        return (
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontSize: size.s35 * 0.95,
              fontWeight: '700',
              fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
              textAlign: 'center',
            }}>
              {item.value}
            </Text>
          </View>
        )
      }
      case 'calendar':
        console.log(props.onPress)
        return (
          <HeaderIcon
            onPress={() => {
              item.onPress();
            }}
            icon={image.ic_calend}
          />
        )
      case 'iconNull': {
        return <HeaderIcon />
      }
      default:
        return null
    }
  }


  return (
    <SafeAreaView
      style={{
        backgroundColor: color.primaryRegular,
      }}
    >
      <StatusBar backgroundColor={color.primaryRegular} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: size.s15,
          paddingVertical: size.s20,
        }}
      >

        {
          listView.map((item, key) => {
            return renderItem(item)
          })
        }


        {/* 
        <HeaderIcon
          icon={image.ic_cart}
        /> */}



      </View>
    </SafeAreaView>
  )

}


Header.defaultProps = {
  title: "Title",
  listView: [
    { name: 'search', action: () => { } },
    { name: 'notification', action: () => { } },
    { name: 'cart', action: () => { } },
  ],
  autoFocus: false,
  onChangeText: () => { },
  onPress: () => { }
}

export default Header
