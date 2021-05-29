import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import size from "../common/assert/size";
import image from "../common/image/index";
import Button from "../common/Button";
import { CustomTextInput } from "../common/CustomTextInput";
import Loading from "../common/Loading";
import CheckBox from '../common/CheckBox'
import CustomBackground from '../common/CustomBackground'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: true,
      showChangeAppType: false,
      appPassword: '',
      type: 'dev',
      rememberPassword: false,
      updateVersion: false,
      link: '',
      label: ''
    };
  }

  async componentDidMount() {
  }


  onPressLogin = async () => {
    // const { username, password, role } = this.state;

    // let deviceToken = ''
    // let deviceID = ''
    // if (appId === 0) {
    //   deviceToken = await getDeviceToken()
    // }

    // let path = RNFS.DocumentDirectoryPath + '/deviceID.txt'
    // await RNFS.exists(path)
    //   .then(async result => {
    //     if (result === false) {
    //       let model = DeviceInfo.getModel()
    //       let brand = DeviceInfo.getBrand()
    //       // let name = await DeviceInfo.getDeviceName()
    //       let deviceId = DeviceInfo.getDeviceId()
    //       let osVersion = DeviceInfo.getSystemVersion()
    //       // let serialNumber = await DeviceInfo.getSerialNumber()
    //       let resolution = Dimensions.get('window').width + 'x' + Dimensions.get('window').height
    //       // let kernel = await DeviceInfo.getHardware()
    //       let fileContent = `${model}_${brand}_${deviceId}_${osVersion}_${resolution}_${new Date().getTime()}_${Math.floor(Math.random() * 10000000000)}`
    //       fileContent.split(' ').join('')
    //       await RNFS.writeFile(path, fileContent, 'utf8')
    //       deviceID = await RNFS.readFile(deviceDataFilePath, 'utf8')
    //     } else {
    //       deviceID = await RNFS.readFile(deviceDataFilePath, 'utf8')
    //     }
    //   })
    // userProfile.deviceID = deviceID
    // this.props.loginBSAction({
    //   username: username,
    //   password: password,
    //   role: role,
    //   deviceID: deviceID,
    //   deviceToken: deviceToken,
    //   versionApp: 'v' + DeviceInfo.getVersion().trim(),
    // });
  }
  componentDidUpdate() {

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={
              (Platform.OS == "ios" ? "padding" : "height",
                Platform.OS === "android" ? null : "padding")
            }
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              {this.props.isFetching && <Loading />}
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps={'handled'}
              >
                <View style={styles.container}>
                </View>
                <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                  <View style={{ flex: 1, width: "80%" }}>
                    <CustomTextInput
                      item={{
                        image: image.mail,
                        title: "Tài khoản đăng nhập:",
                        editable: true,
                        placeHolder: "Tài khoản đăng nhập",
                      }}
                      text={this.state.username}
                      onChangeText={(value) => {
                        this.setState({
                          username: value,
                        });
                      }}
                    />
                    <CustomTextInput
                      item={{
                        image: image.key,
                        title: "Nhập mật khẩu:",
                        editable: true,
                        tag: this.state.showPassword,
                        placeHolder: "Mật khẩu",
                        imageRight: this.state.showPassword === false ? image.eyeclose : image.eye,
                      }}
                      onPressRight={() => {
                        var imagepassword = this.state.showPassword === false ? image.eyeclose : image.eye
                        this.setState({ showPassword: !this.state.showPassword, imagepassword: imagepassword })
                      }}
                      text={this.state.password}
                      onChangeText={(value) => {
                        this.setState({
                          password: value,
                        });

                      }}
                    />

                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: size.s10,
                    }}>
                      {/* <TouchableWithoutFeedback onPress={() => {
                        this.setState({ rememberPassword: !this.state.rememberPassword })
                      }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 1
                          }}
                        >
                          <CheckBox
                            onChangeSelected={() => {
                              console.log(123)
                              this.setState({ rememberPassword: !this.state.rememberPassword })
                            }}
                            isSelected={this.state.rememberPassword}
                            size={size.s30}
                            // borderColor={color.primaryBold}
                             />
                          <Text style={{
                            // color: color.primaryBold,
                          }}>Ghi nhớ đăng nhập</Text>
                        </View>
                      </TouchableWithoutFeedback> */}

                      <View >
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate("ForgotPassword");
                          }}
                        >
                          <Image
                            resizeMode='contain'
                            source={image.forget}
                            style={{
                              width: size.s160 + size.s10,
                              height: size.s55,
                            }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flex: 1, paddingTop: size.s50, paddingBottom: size.s20 }}>
                      <Button
                        label={"Đăng nhập"}
                        style={{
                          backgroundColor: "#F36F20",
                          width: "100%",
                        }}
                        textStyle={{
                          paddingVertical: size.s20,
                        }}
                        onPress={async () => {
                          await this.onPressLogin();
                        }}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>

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
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
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
    flexGrow: 1,
    alignItems: "center",
  },
});