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
import Button from "../../../common/Button";
import size from "../../../common/assert/size";
import image from "../../../common/image/index";
import color from "../../../common/assert/color";
import { CustomTextInput } from "../../../common/CustomTextInput";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
    };
  }
  onChangeEmail = (value) => {
    this.setState({
      email: value,
    });
  };
  onChangePhone = (value) => {
    this.setState({
      phone: value,
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
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Image
                    source={image.goBack}
                    style={{ width: size.s80, height: size.s80 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ position: "absolute", alignItems: "center" }}>
                <Image source={image.forgot} style={styles.image} />
                <Text style={styles.title}>Quên mật khẩu</Text>
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: size.s100 }}>
              <CustomTextInput
                item={{
                  image: image.mail,
                  title: "Nhập địa chỉ email:",
                  editable: true,
                  placeHolder: "Email",
                }}
                value={this.state.email}
                onChangeText={this.onChangeEmail}
              />
              <CustomTextInput
                item={{
                  image: image.phone3,
                  title: "Nhập số điện thoại xác thực:",
                  editable: true,
                  placeHolder: "Số điện thoại",
                }}
                value={this.state.phone}
                onChangeText={this.onChangePhone}
              />
              <View
                style={{
                  flex: 1,
                  paddingTop: size.s50,
                }}
              >
                <Button
                  label="Gửi mã OTP"
                  style={{
                    paddingVertical: size.s10,
                  }}
                  onPress={() => { this.props.navigation.navigate('OTP') }}
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
    flex: 1,
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
  content: {
    flex: 1,
  },
});
