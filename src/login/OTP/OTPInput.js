import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import size from "../../../../common/assert/size";

export default class OTPInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    };
  }
  componentDidMount() {
    this.refs.input1ref.focus();
  }
  otpInput(ref, value, onChangeText) {
    return (
      <View style={styles.viewInput}>
        <TextInput
          maxLength={1}
          ref={ref}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
  render() {
    const { input1, input2, input3, input4 } = this.state;
    return (
      <View style={styles.container}>
        {this.otpInput("input1ref", input1, (text) => {
          this.setState({ input1: text }, () => {
            this.refs.input2ref.focus();
          });
        })}
        {this.otpInput("input2ref", input2, (text) => {
          this.setState({ input2: text }, () => {
            this.refs.input3ref.focus();
          });
        })}
        {this.otpInput("input3ref", input3, (text) => {
          this.setState({ input3: text }, () => {
            this.refs.input4ref.focus();
          });
        })}
        {this.otpInput("input4ref", input4, (text) => {
          this.setState({ input4: text }, () => {
            // alert("thanks");
          });
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: size.s25,
  },
  viewInput: {
    paddingHorizontal: size.s20,
  },
  input: {
    width: size.s80,
    height: size.s100,
    backgroundColor: "rgba(242, 242, 242, 0.33)",
    borderWidth: size.s2,
    borderColor: "#003B35",
    borderRadius: size.s20,
    fontSize: size.h40,
    textAlign: "center",
  },
});
