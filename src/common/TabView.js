import React, { Component, useRef } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import size from './assert/size'
import color from './assert/color'
import image from './image/index'
import SearchBar from './SearchBar'
import Slide from './Slide'
import CustomCalendars from './CustomCalendars'
import { getCurrentDate } from './functions'
export default class TabView extends Component {


  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      scrollDay: {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      dateText: getCurrentDate('date-month-year'),
      isShowSelectDate: false
    }
    this.calendar = React.createRef();
  }

  _animatedTabView = new Animated.Value(0)

  componentDidMount = () => {

    // if (index === listImage.length - 1) {
    //   this.setState({ index: 0 })(0)
    // } else {
    //   this.setState({ index: index + 1 })
    // }

  }

  onPressTabView = (index) => {


    // if (this.state.index === 0) {
    //   Animated.parallel([
    //     // after decay, in parallel:
    //     Animated.spring(this._animatedTabView, {
    //       toValue: 1,
    //       duration: 200,
    //       useNativeDriver: false,
    //     }),
    //     this.scrollView.scrollTo({
    //       x: index * Dimensions.get('window').width,
    //       y: 0,
    //       animated: true
    //     })
    //   ]).start();
    // } else {
    //   Animated.parallel([
    //     // after decay, in parallel:
    //     Animated.spring(this._animatedTabView, {
    //       toValue: 0,
    //       duration: 200,
    //       useNativeDriver: false,
    //     }),
    //     this.scrollView.scrollTo({
    //       x: index * Dimensions.get('window').width,
    //       y: 0,
    //       animated: true
    //     })
    //   ]).start();
    //   // Animated.spring(this._animatedTabView, {
    //   //   toValue: 0,
    //   //   duration: 200,
    //   //   useNativeDriver: false,
    //   // }).start();
    // }
    this.scrollView.scrollTo({
      x: index * Dimensions.get('window').width,
      y: 0,
      animated: true
    })

    // if (this.state.index === 0) {

    //   // Animated.spring(this._animatedTabView, {
    //   //   toValue: 1,
    //   //   duration: 0,
    //   //   useNativeDriver: false,
    //   // }).start(() => {

    //   // });
    // } else {
    //   // Animated.spring(this._animatedTabView, {
    //   //   toValue: 0,
    //   //   duration: 0,
    //   //   useNativeDriver: false,
    //   // }).start(() => {
    //   this.scrollView.scrollTo({
    //     x: index * Dimensions.get('window').width,
    //     y: 0,
    //     animated: true
    //   })
    //   // });
    // }

  }

  onScroll = (event) => {
    let index = event.nativeEvent.contentOffset.x / Dimensions.get('window').width
    Animated.spring(this._animatedTabView, {
      toValue: event.nativeEvent.contentOffset.x / Dimensions.get('window').width,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      if ((index === 0 || index >= 0.99)) {
        this.setState({ index: index }, () => {
          this.props.onChangePage(index)
        })
      }
    });
  }

  onPressFilter = () => {

  }

  render() {
    let backgroundColor = 'transparent'
    // if (Math.round(this.state.index) === index && (this.state.index === 0 || this.state.index > 0.9)) {
    if (this.state.index === 0) {
      backgroundColor = color.primaryRegular
    } else {
      backgroundColor = color.secondaryRegular
    }
    // }
    return (
      <View style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff'
      }}>
        {
          this.state.isShowSelectDate &&
          <Slide
            ref={this.calendar}
            position="flex-end"
            onClose={() => {
              this.setState({
                isShowSelectDate: false
              })
            }}
          >
            <View style={{
              width: Dimensions.get("window").width,
              height: "70%",
              backgroundColor: "#ffff",
              borderTopLeftRadius: size.s30,
              borderTopRightRadius: size.s30,
            }}>
              <CustomCalendars
                notStandard='notStandard'
                content={"Chọn ngày"}
                image={image.ic_close}
                onPressClose={() => {
                  this.calendar.current.close(() => {
                    this.setState({
                      isShowSelectDate: false
                    })
                  });
                }}
                scrollDay={this.state.scrollDay}
                onPress={(value) => {
                  this.setState({ scrollDay: value });
                }}
                onPressSubmit={(date) => {
                  this.props.onSelectDate(this.state.scrollDay)
                  this.setState({
                    dateText:
                      this.state.scrollDay.day + '/' + this.state.scrollDay.month + '/' + this.state.scrollDay.year
                  }, () => {
                    this.calendar.current.close(() => {
                      this.setState({
                        isShowSelectDate: false
                      })
                    });
                  })
                }}
              />
            </View>
          </Slide>
        }
        <View style={{
          width: Dimensions.get('window').width
        }}>
          <View style={{
            marginHorizontal: size.s30,
            marginVertical: size.s30,
            backgroundColor: color.placeholder,
            flexDirection: 'row',
            borderRadius: size.s50
          }}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: backgroundColor,
                borderRadius: size.s50,
                width: '50%',
                height: '100%',
                position: 'absolute',
                transform: [
                  {
                    translateX: this._animatedTabView.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, (Dimensions.get('window').width - size.s60) / 2],
                    }),
                  },
                ]
              }} />
            {
              this.props.item.map((item, index) => {

                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: size.s50
                    }}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.onPressTabView(index)
                      }}
                    >
                      <Text style={{
                        fontSize: size.s30,
                        paddingHorizontal: size.s15,
                        paddingVertical: size.s15,
                        fontWeight: "600",
                        fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                      }}>{item.label}</Text>
                    </TouchableWithoutFeedback>
                  </View>

                )
              })
            }
          </View>

        </View>
        {
          this.props.isShowFilter &&

          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
            // paddingHorizontal: size.s30
          }}>
            {/* <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: size.s30 * 0.9,
                color: color.secondaryBold,
                fontWeight: "600",
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
              }}>Tìm kiếm</Text>
              <Image
                source={image.ic_search}
                style={{
                  width: size.s30,
                  height: size.s30,
                  marginHorizontal: size.s10,
                  tintColor: color.secondaryBold
                }}
              />
            </TouchableOpacity> */}
            <SearchBar
              placeholder='Tìm kiếm'
              iconColor={color.secondaryBold}
              onChangeText={(text) => this.props.onSearching(text)}
              style={{ flex: 1 }}
            />
            {
            }
            {
              this.props.isShowFilterDeliver &&
              <TouchableOpacity
                style={{
                  marginHorizontal: size.s30
                }}
                onPress={() => {
                  this.props.onPressFilter()
                }}
              >
                <Image
                  resizeMode='contain'
                  source={image.ic_filter}
                  style={{
                    tintColor: color.secondaryBold,
                    width: size.s50,
                    height: size.s50,
                  }}
                />
              </TouchableOpacity>
            }

          </View>
        }
        {this.props.defaultValue != undefined ?
          <Text style={{
            marginHorizontal: size.s20,
            paddingHorizontal: size.s30,
            paddingVertical: size.s10,
            color: color.iconBottom,
            fontSize: size.s30,
            width: '100%',
            color: color.placeholder,
          }}>
            Đang tìm kiếm theo NVGN {this.props.defaultValue}
          </Text>
          : null}
        {
          this.props.isShowSelectDate &&
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: size.s30,
            justifyContent: 'space-between'
          }}>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Image
                resizeMode='contain'
                source={this.props.titleIcon}
                style={{
                  tintColor: color.primaryBold,
                  width: size.s45,
                  height: size.s45
                }}
              />
              <Text style={{
                fontSize: size.s30,
                paddingHorizontal: size.s10,
                fontWeight: "600",
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                color: color.primaryBold
              }}>{this.props.title}</Text>

            </View>
            <TouchableOpacity onPress={() => {
              // this.props.onSelectDate()
              this.setState({
                isShowSelectDate: true
              }, () => [
                this.calendar.current.open()
              ])
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: size.s25,
                  paddingHorizontal: size.s10,
                  fontWeight: "600",
                  fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                  color: color.secondaryBold
                }}>{this.state.dateText}</Text>
                <Image
                  resizeMode='contain'
                  source={image.ic_calendar}
                  style={{
                    tintColor: color.secondaryBold,
                    width: size.s40,
                    height: size.s40
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

        }

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={ref => { this.scrollView = ref }}
          onLayout={() => {
          }}
          scrollEventThrottle={16}
          onScroll={(event) => {
            this.onScroll(event)
          }}
          pagingEnabled={true}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
          }}
        >
          {
            this.props.item.map((item, index) => {
              return <View style={{
                flex: 1,
                width: Dimensions.get('window').width,
              }}>
                {item.itemView()}
              </View>
            })
          }
        </ScrollView>



      </View>
    );
  }

}
TabView.defaultProps = {
  onChangePage: (index) => { },
  onSearching: (text) => { }
}
