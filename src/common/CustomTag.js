import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { objectIsNull, stringIsEmpty, arrayIsEmpty } from "./assert/function";
import { color } from "react-native-reanimated";
import size from "./assert/size";
export default class CustomTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClicked: false,
      backgroundColor: this.props.color,
    };
  }

  // componentDidUpdate(preProps) {
  //   if (this.props.click != preProps.click) {
  //     this.setState({ onClicked: this.props.click }, () => {
  //       {
  //         this.state.click
  //           ? this.props.list.push(this.props.object)
  //           : !objectIsNull(this.props.object)
  //           ? this.props.list.splice(
  //               this.props.list.findIndex(
  //                 (object) => object.id == this.props.object.id
  //               ),
  //               1
  //             )
  //           : null;
  //       }
  //       console.log("List Tag", this.props.list);
  //     });
  //   }
  // }

  checkClicked() {
    if (this.state.onClicked !== false) {
      return 0.3;
    } else {
      return 1;
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
            backgroundColor: this.props.color,
            borderColor: this.props.borderColor,
            borderWidth: 1,
            borderRadius: 15,
            opacity: this.checkClicked(),
          },
          this.props.styles,
        ]}
        onPress={() => {
          this.setState(
            {
              onClicked: !this.state.onClicked,
            },
            () => {
              console.log(this.props.object.id)
              this.state.onClicked
                ? this.props.list.push({ id: this.props.object.id })
                : !objectIsNull(this.props.object)
                  ? this.props.list.splice(
                    this.props.list.findIndex(
                      (id) => id == this.props.object.id
                    ),
                    1
                  )
                  : null;
              // console.log("List Tag", this.props.list);
            }
          );
          this.props.onPress(this.props.list);
        }}
      >
        <Text
          style={{
            fontSize: size.h28,
            fontWeight: "600",
            fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
            color: this.props.fontColor,
          }}
        >
          {!objectIsNull(this.props.title) ? this.props.title : "Title"}
        </Text>
      </TouchableOpacity>
    );
  }
}
