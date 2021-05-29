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
  Animated,
  Easing,
} from "react-native";
import size from "../../../../common/assert/size";
import image from "../../../../common/image/index";
import color from "../../../../common/assert/color";
import Button from "../../../../common/Button";
import OTPInput from "./OTPInput";

export default class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
      loadingValue: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this._timeOut();
    this._loading();
  }
  _refresh = () => {
    Animated.sequence([
      Animated.timing(this.state.loadingValue, {
        toValue: 95,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.loadingValue, {
        toValue: 0,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => this._refresh());
  };
  _loading = () => {
    Animated.sequence([
      Animated.timing(this.state.loadingValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.loadingValue, {
        toValue: 0,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this._refresh();
    });
  };
  _timeOut() {
    this.setState(
      {
        time: this.state.time,
      },
      () => {
        setInterval(() => {
          if (this.state.time > 0) {
            this.setState({
              time: this.state.time - 1,
            });
          } else {
          }
        }, 1000);
      }
    );
  }
  render() {
    const turn = this.state.loadingValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["0deg", "360deg"],
    });
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
                <Text style={styles.title}>Xác thực OTP</Text>
                <Text style={styles.title1}>
                  Đang gửi mã OPT đến số điện thoại xác thực 090 XXX YYYY
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <OTPInput />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: size.s160,
                }}
              >
                <Text style={[styles.text, { color: "#B93D00", width: "50%" }]}>
                  Tự động gửi lại mã
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Animated.Image
                    source={image.loading}
                    style={{
                      transform: [{ rotate: turn }],
                      width: size.s35,
                      height: size.s35,
                    }}
                  />
                  <Text
                    style={[
                      styles.text,
                      { color: "#003B35", paddingHorizontal: size.s20 },
                    ]}
                  >{`${this.state.time} s`}</Text>
                </View>
              </View>
              <View
                style={{ flex: 1, paddingHorizontal: size.s100, width: "100%" }}
              >
                <Button
                  label="Xác nhận"
                  textStyle={{
                    paddingVertical: size.s20,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("ResetPassword");
                  }}
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
    paddingTop: size.s30,
  },
  title1: {
    color: "#003B35",
    fontSize: size.h24,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    // alignItems: "center",
  },
  text: {
    fontSize: size.h24,
    fontWeight: "600",
  },
});
