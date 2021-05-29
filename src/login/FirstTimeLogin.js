import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
  SafeAreaView,
  BackHandler,
} from "react-native";
import size from "../../../common/assert/size";
import image from "../../../common/image/index";
import Button from "../../../common/Button";
import { CustomTextInput } from "../../../common/CustomTextInput";
import Loading from "../../../common/Loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import { userProfile } from "../../config/settings";
import { objectIsNull } from "../../../common/assert/function";

export default class FirstTimeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password_new: "",
      password_confirm: "",
      isFirst: true,
    };
  }
  componentDidMount = () => {
    // BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   this.handleBackButtonClick
    // );
  };
  handleBackButtonClick = () => {
    return true;
  };
  confirm_password = () => {
    const { password_new, password_confirm, isFirst } = this.state;
    if (password_new.length >= 8 && password_new.length <= 12) {
      if (password_confirm !== "" && password_confirm !== undefined) {
        if (password_new !== password_confirm) {
          Alert.alert("Thông báo", "Mật khẩu không khớp", [
            {
              text: "OK",
              onPress: () => { },
            },
          ]);
        } else {
          this.props.updateLoginFirstBSAction({
            token_id: userProfile.token_id,
            isFirst: isFirst,
          });
        }
      } else {
        Alert.alert("Thông báo", "Vui lòng xác nhận mật khẩu", [
          {
            text: "Đóng",
            onPress: () => { },
          },
        ]);
      }
    } else {
      Alert.alert(
        "Thông báo",
        "Mật khẩu phải có độ dài ít nhất 8 ký tự và tối đa 12 ký tự !",
        [
          {
            text: "Đóng",
            onPress: () => { },
          },
        ]
      );
    }
  };
  componentDidUpdate(prevProps, prevState) {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    const {
      isFetchingChangePass,
      dataChangePass,
      errorChangePass,
      isFetchingUpdateLoginFirst,
      dataUpdateLoginFirst,
      errorUpdateLoginFirst,
    } = this.props;
    if (
      isFetchingChangePass !== prevProps.isFetchingChangePass &&
      !isFetchingChangePass
    ) {
      if (errorChangePass !== null && errorChangePass !== undefined) {
        Alert.alert(
          "Thông báo",
          errorChangePass,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else if (dataChangePass !== null && dataChangePass !== undefined) {
        if (
          dataChangePass.error !== undefined &&
          dataChangePass.error.message !== undefined
        ) {
          Alert.alert(
            "Thông báo",
            dataChangePass.error.message.value,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        } else {
          if (dataChangePass.d !== undefined) {
            this.confirm_password();
          }
        }
      }
    }
    if (
      isFetchingUpdateLoginFirst !== prevProps.isFetchingUpdateLoginFirst &&
      !isFetchingUpdateLoginFirst
    ) {
      // if (
      //   errorUpdateLoginFirst !== null &&
      //   errorUpdateLoginFirst !== undefined
      // ) {
      //   Alert.alert(
      //     "Thông báo",
      //     errorUpdateLoginFirst,
      //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      //     { cancelable: false }
      //   );
      // } else if (
      //   dataUpdateLoginFirst !== null &&
      //   dataUpdateLoginFirst !== undefined
      // ) {
      //   if (
      //     dataUpdateLoginFirst.error !== undefined &&
      //     dataUpdateLoginFirst.error.message !== undefined
      //   ) {
      //     Alert.alert(
      //       "Thông báo",
      //       dataUpdateLoginFirst.error.message.value,
      //       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      //       { cancelable: false }
      //     );
      //   } else {
      //     if (dataUpdateLoginFirst.d !== undefined) {
      this.props.navigation.replace("PasswordChangeResult");
      //       }
      //     }
      //   }
    }
  }
  onPressChangePass = () => {
    const { password_new } = this.state;
    this.props.changePassBSAction({
      token_id: userProfile.token_id,
      password: password_new,
    });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={
            (Platform.OS == "ios" ? "padding" : "height",
              Platform.OS === "android" ? null : "padding")
          }
          style={{ flex: 1 }}
        >
          {this.props.isFetchingChangePass &&
            this.props.isFetchingUpdateLoginFirst && <Loading />}
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(89, 198, 188, 0.05)",
            }}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.content}
            >

              {/* <View style={{ padding: size.s40, position: "absolute" }}> */}

              <TouchableOpacity
                style={{
                  paddingHorizontal: size.s30,
                  alignSelf: 'flex-start',
                  paddingVertical: size.s20
                }}
                onPress={() => {
                  console.log(99999)
                  this.props.navigation.goBack();
                }}
              >
                <Image
                  source={image.goBack}
                  style={{
                    height: size.s75,
                    width: size.s75,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              {/* </View> */}
              <View style={styles.container}>
                <Image source={image.firs_time_login} style={styles.image} />
                <Text style={styles.title}>Thay đổi mật khẩu</Text>
              </View>
              <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                <View style={{ flex: 1, width: "80%" }}>
                  <CustomTextInput
                    item={{
                      tag: true,
                      // first: true,
                      image: image.new_pass,
                      title: "Đặt mật khẩu mới:",
                      editable: true,
                      tag: true,
                      placeHolder: "Mật khẩu mới",
                      note: "Ít nhất 8 ký tự",
                      disabled: true,
                    }}
                    styleNote={{
                      paddingTop: size.s10,
                    }}
                    text={this.state.password_new}
                    onChangeText={(value) => {
                      this.setState({
                        password_new: value,
                      });
                    }}
                  />
                  <CustomTextInput
                    item={{
                      tag: true,
                      // first: true,
                      image: image.confirm,
                      title: "Xác nhận mật khẩu mới:",
                      editable: true,
                      tag: true,
                      placeHolder: "Nhập lại mật khẩu mới",
                      note: "Ít nhất 8 ký tự",
                      disabled: true,
                    }}
                    styleNote={{
                      paddingTop: size.s10,
                    }}
                    text={this.state.password_confirm}
                    onChangeText={(value) => {
                      this.setState({
                        password_confirm: value,
                      });
                    }}
                  />
                  <View style={{ flex: 1, paddingTop: size.s50, paddingBottom: size.s20 }}>
                    <Button
                      label={"Xác nhận"}
                      style={{
                        backgroundColor: "#F36F20",
                        width: "100%",
                      }}
                      textStyle={{
                        paddingVertical: size.s20,
                        fontWeight: "700",
                      }}
                      onPress={() => {
                        this.onPressChangePass();
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: size.s200 * 2 + size.s35,
    height: size.s340 - size.s40,
    resizeMode: "contain",
  },
  title: {
    color: "#003B35",
    fontSize: size.h40,
    fontWeight: "600",
    paddingTop: size.s25,
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
  },
  content: {
    flexGrow: 1,
    // alignItems: "center",
  },
});
