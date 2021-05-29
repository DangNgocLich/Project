import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import color from "./assert/color";
import size from "./assert/size";
import PropTypes from "prop-types";
export default class CustomGroupButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      icon,
      touchableStyle,
      textStyle,
      iconStyle,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity
        style={[touchableStyle, { flexDirection: "row" , justifyContent:"center", alignItems:"center"}]}
        // onPress={() => {
        //   this.toggleModal(true);
        // }}
        onPress={onPress}
      >
        <Text style={[textStyle, { color: color.textColor2 }]}>{title}</Text>
        <Image
          source={icon}
          resizeMode={"contain"}
          style={[
            iconStyle,
            {
              marginLeft: size.s10,
              width: size.s30,
              tintColor: color.textColor2,
              height: size.s30,
            },
          ]}
        ></Image>
      </TouchableOpacity>
    );
  }
}

CustomGroupButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  touchableStyle: PropTypes.object,
  textStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};
