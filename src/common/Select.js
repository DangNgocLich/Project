import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import color from "./assert/color";
import size from "./assert/size";
import Icon from "react-native-vector-icons/FontAwesome5";
import CustomBackground from "./CustomBackground";
import image from "./image";
import DiscountButton from "../boston_sale/components/cart/DiscountButton";
import Button from "../common/Button";
import Loading from "../common/Loading";
import SearchBar from '../common/SearchBar'
import CustomerItemView from '../common/CustomerItemView'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Select = forwardRef((props, ref) => {
  let [showSelect, setShowSelect] = useState(false);
  let [selectedItem, setSelectedItem] = useState(

    props.defaultValue !== undefined ? props.defaultValue : undefined
  );
  const [state, setState] = useState(1)
  const {
    listItem,
    borderDefaultColor,
    renderItemView,
    selectView,
    itemType,
    multiple,
  } = props;
  // _animatedShowSelect = new Animated.Value(showSelect ? 0 : 1);
  _animatedShowSelect = useRef(new Animated.Value(0)).current;
  const time = props.time;
  let [error, setError] = useState("");
  useImperativeHandle(ref, () => ({
    error: (key, content) => {
      if (key === props.id) {
        setError(content);
        return false;
      }
    },
    clearError: (key) => {
      if (key === props.id) {
        setError("");
      }
    },
    info: () => { },
    open: () => {
      setShowSelect(true)
    }
  }));

  useEffect(() => {
    if (props.defaultValue !== undefined) {

      setSelectedItem(props.defaultValue)
    }
    else {
      setSelectedItem(undefined)
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if (showSelect) {
      Animated.timing(_animatedShowSelect, {
        toValue: 1,
        duration: time,
        useNativeDriver: false,
      }).start();
    } else {
    }
  }, [showSelect]);

  handleOpen = async () => {
    // await setShowSelect(true)
    // Animated.timing(_animatedShowSelect, {
    //   toValue: 1,
    //   duration: time,
    //   useNativeDriver: false
    // }).start()
  };

  handleClose = async (callback) => {
    Animated.timing(_animatedShowSelect, {
      toValue: 0,
      duration: time,
      useNativeDriver: false,
    }).start();
    setTimeout(async () => {
      setShowSelect(false);
      if (callback !== undefined) {
        await callback();
      }
    }, time);
  };

  onSelectItem = (item) => {
    // handleClose(() => {
    if (multiple) {
      let tmp = []
      if (selectedItem !== undefined) {
        tmp = selectedItem
        let checkExist = tmp.findIndex(ele => item.id === ele.id)
        if (checkExist !== -1) {
          tmp.splice(checkExist, 1)
        } else {
          tmp.push(item)
        }
      } else {
        tmp.push(item)
      }
      setSelectedItem(tmp)
      setState(state + 1)
      // props.onChooseItem(tmp);
    } else {
      setSelectedItem(item)
    }
    // });
  };

  renderItem = ({ item, index }) => {
    // console.log(item)
    let selected = false
    if (multiple && selectedItem !== undefined && itemType !== 'productList') {
      let index = selectedItem.findIndex(ele => item.id === ele.id)
      if (index !== -1) {
        selected = true
      }
    }
    switch (itemType) {
      case "select-client":
        return (
          <CustomerItemView
            item={item}
            selectedItem={selectedItem}
            onPress={() => {
              handleClose(() => {
                setSelectedItem(item);
                props.onChooseItem(item);
              });
            }}
          />
          // <TouchableOpacity
          //   onPress={() => {
          //     handleClose(() => {
          //       setSelectedItem(item);
          //       props.onChooseItem(item);
          //     });
          //   }}
          //   key={index}
          // >
          //   <CustomBackground
          //     backgroundColor={
          //       item === selectedItem ? color.secondaryMedium : "#ffffff"
          //     }
          //     opacity={item === selectedItem ? 0.15 : 1}
          //   />
          //   <View
          //     style={{
          //       width: Dimensions.get("window").width * 0.9,
          //       paddingVertical: size.s20,
          //       paddingHorizontal: size.s40,
          //       borderBottomColor: color.secondaryBold,
          //       borderBottomWidth: 1,
          //     }}
          //   >
          //     <View
          //       style={{
          //         flexDirection: "row",
          //         alignItems: "center",
          //         paddingVertical: size.s5,
          //         justifyContent: 'space-between',
          //       }}
          //     >
          //       <Text
          //         style={{
          //           fontSize: size.s35 * 0.9,
          //           color: color.primaryBold,
          //           fontWeight: "500",
          //           fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
          //           maxWidth: Dimensions.get("window").width * 0.5
          //         }}
          //       >
          //         {item.label}
          //       </Text>


          //       <Text
          //         style={{
          //           fontSize: size.s25,
          //           color: color.secondaryBold,
          //           fontWeight: "400",
          //           fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
          //           paddingRight: size.s30
          //         }}
          //       >
          //         {item.code}
          //       </Text>
          //     </View>
          //     <View
          //       style={{
          //         flexDirection: "row",
          //         flex: 1,
          //         alignItems: "center",
          //         paddingVertical: size.s5,
          //       }}
          //     >
          //       <Text
          //         style={{
          //           fontSize: size.s25,
          //           color: color.primaryBold,
          //           fontWeight: "500",
          //           fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
          //         }}
          //       >
          //         {item.address}
          //       </Text>
          //     </View>
          //   </View>
          // </TouchableOpacity>
        );

        break;
      case "select-tdv":
        return (
          <TouchableOpacity
            onPress={() => {
              handleClose(() => {
                setSelectedItem(item);
                props.onChooseItem(item);
              });
            }}
            key={index}
          >
            <CustomBackground
              backgroundColor={
                item === selectedItem ? color.secondaryMedium : "#ffffff"
              }
              opacity={item === selectedItem ? 0.15 : 1}
            />
            <View
              style={{
                width: Dimensions.get("window").width * 0.9,
                paddingVertical: size.s20,
                paddingHorizontal: size.s40,
                borderBottomColor: color.secondaryBold,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: size.s5,
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: size.s35 * 0.9,
                    color: color.primaryBold,
                    fontWeight: "500",
                    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                    maxWidth: Dimensions.get("window").width * 0.5
                  }}
                >
                  {item.label}
                </Text>


                <Text
                  style={{
                    fontSize: size.s25,
                    color: color.secondaryBold,
                    fontWeight: "400",
                    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                    paddingRight: size.s30
                  }}
                >
                  {item.code}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: size.s5,
                }}
              >
                <Text
                  style={{
                    fontSize: size.s25,
                    color: color.primaryBold,
                    fontWeight: "500",
                    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
        break;
      case "promotion":
        return (
          <TouchableOpacity
            onPress={() => {
              // setSelectedItem(item)
              // onSelectItem(item);
              // handleClose(() => {
              //   setSelectedItem(item)
              handleClose(() => {
                setSelectedItem(item);
                props.onChooseItem(item);
              });
              // })
            }}
            key={index}
          >
            {
              selected &&
              <CustomBackground
                backgroundColor={
                  color.secondaryMedium
                }
                opacity={0.15}
              />
            }

            <View
              style={{
                width: Dimensions.get("window").width * 0.9,
                paddingVertical: size.s20,
                paddingHorizontal: size.s40,
                borderBottomColor: color.secondaryBold,
                borderBottomWidth: 1,
                flexDirection: "row",
              }}
            >
              <View style={{
                width: Dimensions.get('window').width * 0.2
              }}>
                <Text
                  style={{
                    fontSize: size.s35 * 0.9,
                    color: color.secondaryBold,
                    fontWeight: "600",
                    paddingTop: size.s15,
                    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                  }}
                >
                  {item.code}
                </Text>
              </View>

              {/* <View style={{ flex: 1 }} /> */}

              <View style={{
                flex: 1,
              }}>
                <Text
                  style={{
                    fontSize: size.s35 * 0.9,
                    color: color.secondaryBold,
                    paddingTop: size.s15,
                    paddingHorizontal: size.s20,

                  }}
                >
                  {item.label}
                </Text>
              </View>

              {selected ? (
                <View
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={image.ic_tick}
                    style={{
                      width: size.h28,
                      height: size.h28,
                      resizeMode: "contain",
                      tintColor: "#B93D00",
                    }}
                  />
                </View>
              ) : (
                  <View style={{}} />
                )}
            </View>
          </TouchableOpacity>
        );
      case "product":
        console.log(item)
        return (
          // <View style={{
          //   backgroundColor: '#ffffff',
          //   height: Dimensions.get('window').height * 0.7,
          //   borderTopRightRadius: size.s20,
          //   borderTopLeftRadius: size.s20,
          // }}>
          //   <View
          //     style={{
          //       borderTopRightRadius: size.s20,
          //       borderTopLeftRadius: size.s20,
          //       width: Dimensions.get('window').width,
          //       borderColor: color.placeholder,
          //       flexDirection: 'row',
          //       backgroundColor: color.primaryRegular,
          //     }}>
          //     <View>
          //       <Text
          //         style={{
          //           fontSize: size.s30 * 1.1,
          //           paddingVertical: size.s30 * 0.8,
          //           alignSelf: 'flex-start',
          //           color: color.text,
          //           fontWeight: '500',
          //           fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
          //           paddingHorizontal: size.s30
          //         }}>
          //         {'Thông tin đơn hàng'}
          //       </Text>
          //     </View>
          //     <TouchableOpacity
          //       style={{
          //         justifyContent: 'center',
          //         position: 'absolute',
          //         right: size.s30,
          //         height: '100%'
          //       }}
          //       onPress={() => this.slide.current.close(() => {
          //         this.setState({
          //           onShowProductList: false
          //         })
          //       })}
          //     >
          //       <Image
          //         style={{
          //           width: size.s30,
          //           height: size.s30
          //         }}
          //         source={image.ic_close}
          //       />
          //     </TouchableOpacity>
          //   </View>

          //   <ScrollView
          //     style={{
          //       marginHorizontal: size.s30,
          //       paddingTop: size.s40,
          //       flex: 1,
          //     }}
          //     contentContainerStyle={{ flex: 1 }}
          //   >
          //     {
          //       props.itemList.map((item, key) => {
          //         return (


          <View
            key={index}
            style={{
              flexDirection: 'row',
              borderBottomColor: color.primaryBold,
              borderBottomWidth: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%'
            }}>
            <Text
              style={{
                fontWeight: '500',
                flex: 1,
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                color: color.primaryBold,
                fontSize: size.s30,
                lineHeight: size.s40,
                paddingVertical: size.s20
              }}>{item.stt}{'. '}{item.productName.toUpperCase()}{' '}{item.productSize.toLowerCase()}</Text>

            <Text
              style={{
                fontWeight: '500',
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                color: color.dangerBold,
                fontSize: size.s30,
                lineHeight: size.s40,
                paddingVertical: size.s20
              }}>{item.qty}{' '}{item.unit}</Text>
          </View>

          //         )
          //       })
          //     }
          //   </ScrollView>
          // </View>
        )
      default:
        return (
          <View
            style={{
              borderBottomWidth: 1,
              width: width * 0.9,
              marginHorizontal: size.s20,
              alignItem: "center",
              justifyContent: "center",
              borderColor: color.placeholder,
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                handleClose(() => {
                  setSelectedItem(item);
                  props.onChooseItem(item);
                });
              }}
            >
              <CustomBackground
                backgroundColor={
                  (item === selectedItem || (selectedItem !== undefined && item.id === selectedItem.id)) ? color.secondaryMedium : "#ffffff"
                }
                opacity={(item === selectedItem || (selectedItem !== undefined && item.id === selectedItem.id)) ? 0.15 : 1}
              />

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: size.s30
              }}>
                <Text
                  style={{
                    fontSize: props.size,
                    paddingVertical: size.s25,
                    color: color.secondaryBold,
                    fontWeight: '600',
                    paddingRight: size.s30,
                    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                  }}
                >
                  {item.label !== undefined ? item.label : item}
                </Text>
                <View style={{ flex: 1 }} />
                {
                  (item === selectedItem || (selectedItem !== undefined && item.id === selectedItem.id)) &&
                  <Image
                    resizeMode='contain'
                    source={image.ic_tick}
                    style={{
                      width: size.s30,
                      height: size.s30,
                      tintColor: color.secondaryBold,
                    }}
                  />
                }
              </View>

            </TouchableOpacity>
          </View>
          //   :
          // (
          //   renderItemView(
          //     item,
          //     index,
          //     handleClose,
          //     callback = () => {
          //       setSelectedItem(item)
          //       props.onChooseItem(item)
          //     }
          //   )
          // )
          /*:*/
         /*:*/);
        break;
    }
  };

  let borderColor = props.borderDefaultColor;
  if (showSelect) {
    borderColor =
      borderDefaultColor !== undefined ? borderDefaultColor : "#007AFF";
  }
  if (error !== "") {
    borderColor = "red";
  }

  return (

    <View style={[styles.container, props.style]}>
      {selectView === undefined ? (
        <TouchableOpacity
          disabled={listItem === undefined || listItem.length <= 0}
          style={[
            {
              borderColor: (listItem === undefined || listItem.length <= 0) ? color.placeholder : borderColor,
              borderWidth: 1,
              borderRadius: size.s30,
              flexDirection: "row",
            },
            props.borderStyle,
          ]}
          onPress={async () => {
            if (listItem !== undefined && listItem.length <= 0) {
              // Alert.alert(
              //   "Thông báo",
              //   props.errorMessage,
              //   [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              //   { cancelable: false }
              // )
            } else {
              await setShowSelect(true);
            }
          }}
        >
          <CustomBackground
            style={[
              {
                borderRadius: size.s30,
              },
              props.borderStyle,
            ]}
            backgroundColor={
              showSelect || selectedItem ? borderColor : "#ffffff"
            }
            opacity={selectedItem === undefined ? 0.3 : 0.15}
          />
          <View>
            <Text
              style={{
                paddingVertical: props.size * 0.6,
                // paddingTop: selectedItem === undefined ? props.size : (props.size * 0.7),
                // paddingBottom: selectedItem === undefined ? props.size : (props.size * 0.7 - 5),
                paddingRight: props.size * 1.5,
                paddingLeft: size.s20,
                fontSize: props.size,
                color: (listItem === undefined || listItem.length <= 0) ? color.placeholder : borderDefaultColor,
              }}
            >
              {selectedItem !== undefined
                ? selectedItem.label
                : props.placeholder}
            </Text>
          </View>
          <Icon
            name={"chevron-down"}
            size={props.size}
            color={(listItem === undefined || listItem.length <= 0) ? color.placeholder : borderColor}
            style={{
              alignSelf: "center",
              right: props.size * 0.5,
              position: "absolute",
            }}
          />
        </TouchableOpacity>
      ) : (
          selectView(
            (callback = () => {
              if (listItem !== undefined && listItem.length <= 0) {
                Alert.alert(
                  "Thông báo",
                  props.errorMessage,
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
                )
              } else {
                setShowSelect(true);
              }
            })
          )
        )}

      {/* <DiscountButton onPress={async () => {
          }} /> */}

      {error !== "" && <ErrorView error={error} />}
      <Modal animationType="none" transparent={true} visible={showSelect}>
        <KeyboardAvoidingView
          enabled={false}
          behavior={Platform.OS === 'android' ? 'height' : null}
          style={{
            flex: 1,
            // flexGrow:1,
            // height:50
            // backgroundColor:'red'
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              handleClose(() => {
                props.onClose()
              })
            }}
          >
            <View
              style={{
                backgroundColor: color.popupBackground,
                flex: 1, 
                width: "100%",
                // height:"100%",
                justifyContent: "flex-end",
                alignItem: "center",
              }}
            >
              <TouchableWithoutFeedback>
                <Animated.View
                  disabled={true}
                  style={{
                    transform: [
                      {
                        translateY: _animatedShowSelect.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1000, 0],
                        }),
                      },
                    ],
                    width: "100%",
                    backgroundColor: "#ffffff",
                    alignSelf: "center",
                    borderTopEndRadius: 15,
                    borderTopStartRadius: 15,
                    // maxHeight: height * 0.8,
                    maxHeight: '80%',
                    minHeight: height * 0.3,
                    height: props.isSearch ? height * 0.8 : height * 0.5,
                  }}
                >
                  {(props.isSearching || props.loading) &&
                    <Loading backgroundColor='none' />}

                  <View
                    style={{
                      // borderBottomWidth: 0.5,
                      borderTopRightRadius: size.s20,
                      borderTopLeftRadius: size.s20,
                      width: width,
                      borderColor: color.placeholder,
                      flexDirection: "row",
                      backgroundColor: color.secondaryMedium,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: props.size * 1.1,
                          paddingVertical: props.size * 0.8,
                          alignSelf: "flex-start",
                          color: color.text,
                          fontWeight: Platform.OS === "ios" ? "500" : "bold",
                          paddingHorizontal: size.s70,
                          fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                        }}
                      >
                        {props.placeholder}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        position: "absolute",
                        right: size.s30,
                        height: "100%",
                      }}
                      onPress={() =>
                        handleClose(() => {
                          props.onClose()
                        })
                      }
                    >
                      <Image
                        style={{
                          width: props.size,
                          height: props.size,
                        }}
                        source={image.ic_close}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* <ScrollView>
                  {
                    listItem.map((item, index) =>
                      renderItem(item, index)
                    )
                  }
                </ScrollView> */}

                  {
                    props.isSearch &&
                    <View style={{
                      flexDirection: 'row',
                      paddingVertical: size.s15
                    }}>
                      <SearchBar
                        placeholder='Tìm kiếm'
                        iconColor={color.secondaryBold}
                        onChangeText={(text) => {
                          props.onSearching(text)
                        }}
                        style={{
                          backgroundColor: '#eeeeee',
                          marginHorizontal: size.s50,
                        }}
                      />
                    </View>
                  }
                  {/* <SearchBar
                    onFocus={() => {
                      console.log(12321312)
                    }}
                    onChangeText={(text) => {
                      console.log(text)
                    }}
                    style={{
                      paddingVertical: size.s40,
                      marginHorizontal: size.s60,
                      marginVertical: size.s20
                    }}
                    placeholder='Tìm kiếm khách hàng'
                  /> */}
                  {(listItem.length == 0 && !props.isSearching) ? (
                    <Text style={{
                      fontSize: size.s35 * 0.9,
                      color: color.primaryBold,
                      fontWeight: "500",
                      fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,

                      textAlign: 'center'
                    }}>
                      Không tìm thấy {props.placeholderempty}
                    </Text>
                  ) :
                    (<FlatList
                      showsVerticalScrollIndicator={false}
                      data={listItem}
                      keyExtractor={(item, index) => {
                        index.toString();
                      }}
                      renderItem={(item, index) => renderItem(item, index)}
                      style={{
                        width: "100%",
                        alignSelf: "center",
                        backgroundColor: "#ffffff",
                      }}
                      contentContainerStyle={{
                        alignItems: "center",
                      }}
                      disableIntervalMomentum={true}
                      onRefresh={() => props.onRefresh()}
                      onEndReachedThreshold={0.3}
                      onEndReached={() => {
                        props.loadMore();
                      }}
                      legacyImplementation={true}
                      windowSize={30}
                      removeClippedSubviews={true}
                      refreshing={props.refreshing}
                      ListFooterComponent={
                        () =>
                          props.isLoadMore &&
                          <ActivityIndicator
                            style={{
                              marginVertical: size.s30
                            }}
                            size="large"
                            color={color.primaryRegular}
                          />
                      }
                    />)}
                  {
                    props.isShowSelectAll &&
                    <Button
                      onPress={() => {
                        props.onPressSelectAll((callback) => {
                          handleClose(callback)
                        })
                      }}
                      label='Xem tất cả'
                      backgroundColor={color.secondaryMedium}
                      style={{
                        alignSelf: 'flex-end',
                        marginHorizontal: size.s60,
                        marginVertical: size.s30,
                        paddingVertical: size.s10
                      }}
                    />
                  }

                  {/* {itemType === "promotion" && (
                    <View style={{ alignItems: "flex-end" }}>
                      <Button
                        label={"Xác nhận"}
                        style={{
                          backgroundColor: "#F36F20",
                          marginHorizontal: size.s80,
                          marginVertical: size.s50
                        }}
                        textStyle={{
                          paddingVertical: size.s20,
                        }}
                        onPress={() => {
                          console.log(selectedItem)
                          if (selectedItem === undefined || (selectedItem !== undefined && selectedItem.length) <= 0) {
                            Alert.alert(
                              "Thông báo",
                              'Vui lòng chọn mã khuyến mãi',
                              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                              { cancelable: false }
                            )
                          } else {
                            props.onChooseItem(selectedItem)
                            handleClose()
                          }

                        }}
                      />
                    </View>
                  )} */}
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
});

Select.defaultProps = {
  placeholder: "Select an item",
  type: "normal",
  size: 16,
  time: 300,
  onChooseItem: () => { },
  label: "",
  isRequired: false,
  listItem: [],
  borderDefaultColor: "#EFEFEF",
  itemView: <View></View>,
  multiple: false,
  errorMessage: 'Không có item nào',
  onSearching: () => { },
  onRefresh: () => { },
  loadMore: () => { },
  refreshing: false,
  loading: false,
  isLoadMore: false,
  onClose: () => { },
  placeholderempty: '',
  isSearching: false,
};

export default Select;

const styles = StyleSheet.create({
  container: {},
  icon: {},
});
