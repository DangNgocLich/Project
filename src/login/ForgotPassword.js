import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  Linking
} from "react-native";
import Button from "../common/Button";
import size from "../common/assert/size";
import image from "../common/image/index";
import color from "../common/assert/color";


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "1900 1910",
    };
  }



  render() {
    return (

      <View style={{ flex: 1, backgroundColor: "#F7FCFC", }}>

        <View style={[styles.container, {}]}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Image
                source={image.goBack}
                style={{ width: size.s80, height: size.s80, }}
              />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Image source={image.forgot} style={[styles.image, { marginTop: size.s70 * 2 }]} />
            <Text style={[styles.title, { textAlign: "center", paddingBottom: size.s60 * 2 }]}>Quên mật khẩu</Text>
            <Button
              label={"Liên hệ HOTLINE: " + this.state.phone}
              style={{
                paddingVertical: size.s10,
              }}
              textStyle={[styles.primaryText, { color: 'black' }]}
              onPress={() => {
                Linking.openURL(`tel:${this.state.phone}`)
              }}
              backgroundColor={color.secondaryMedium}
            />
          </View>
        </View>


      </View>

    );
  }
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

  },
  header: {

    width: "100%",
    padding: size.s40,
    paddingVertical: size.s80
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
  primaryText: {
    fontSize: size.h32,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    paddingVertical: size.s10,
    color: color.primaryBold,
  },
  secondaryText: {
    fontSize: size.s30,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    color: color.secondaryBold,
  },
});
