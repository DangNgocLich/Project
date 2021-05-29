import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import size from "../../../common/assert/size";
import image from "../../../common/image/index";
import color from '../../../common/assert/color'
import { CustomTextInput } from "../../../common/CustomTextInput";
import Button from "../../../common/Button";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirm: "",
    };
  }
  onChangePassword = (value) => {
    this.setState({
      password: value,
    });
  };
  onChangeConfirm = (value) => {
    this.setState({
      confirm: value,
    });
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? null : "padding"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: "#F7FCFC" }}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.container}>
              <Image source={image.confirm1} style={styles.image} />
              <Text style={styles.title}>Xác thực OTP thành công</Text>
              <Text style={styles.title1}>
                Vui lòng đổi mật khẩu để tiếp tục đăng nhập
              </Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: size.s100 }}>
              <CustomTextInput
                item={{
                  image: image.new_pass,
                  title: "Đặt mật khẩu mới:",
                  editable: true,
                  placeHolder: "Mật khẩu mới",
                  note: "Ít nhất 8 ký tự",
                  disabled: true,
                }}
                styleNote={{
                  paddingTop: size.s10,
                }}
                value={this.state.password}
                onChangeText={this.onChangePassword}
              />
              <CustomTextInput
                item={{
                  image: image.confirm,
                  title: "Xác nhận mật khẩu mới:",
                  editable: true,
                  placeHolder: "Nhập lại mật khẩu mới",
                }}
                value={this.state.confirm}
                onChangeText={this.onChangeConfirm}
              />
              <View
                style={{
                  flex: 1,
                  paddingTop: size.s50,
                }}
              >
                <Button
                  label="Xác nhận"
                  style={{
                    paddingVertical: size.s10,
                  }}
                  onPress={() => { this.props.navigation.navigate('Login') }}
                  backgroundColor={color.secondaryMedium}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    padding: size.s40,
  },
  image: {
    width: width - size.s200,
    height: size.s340 - size.s40,
    resizeMode: "contain",
  },
  title: {
    color: "#003B35",
    fontSize: size.h40,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    paddingTop: size.s30,
  },
  title1: {
    color: "#003B35",
    fontSize: size.h24,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
  },
  content: {
    flex: 1,
    // alignItems: "center",
  },
});
