import React, { Component} from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import PropTypes from "prop-types";
import size from "./assert/size";
import image from "./image/index";
import { objectIsNull } from "./assert/function";
import CustomBackground from "./CustomBackground";
("./assert/function");
export default class CustomCheckBox extends Component {
  constructor() {
    super();
    this.state = {
      checked: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.checked != prevProps.checked) {
      this.setState({ checked: this.props.checked }, () => {
        {
          this.state.checked
            ? this.props.checkedObjArr.push(this.props.object)
            : !objectIsNull(this.props.object)
            ? this.props.checkedObjArr.splice(
                this.props.checkedObjArr.findIndex(
                  (object) => object.id == this.props.object.id
                ),
                1
              )
            : null;
        }
        console.log("objectArray", this.props.checkedObjArr);
      });
    }
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="transparent"
      >
        <View>
          <View
            style={{
              width: this.props.size,
              height: this.props.size,
              backgroundColor: "white",
              borderColor: this.props.color,
              borderWidth: 2,
            }}
          >
             {this.state.checked &&
              
                <CustomBackground
                  backgroundColor={this.props.color}
                  opacity={0.1}
                 
                />
             }
            {this.state.checked ? (
              <View style={styles.selectedUI}>
                {/* <CustomBackground
                  backgroundColor={this.props.color}
                  opacity={0.2}
                 
                /> */}
                <Image
                  resizeMode="contain"
                  source={image.ic_tick}
                  style={[
                    styles.checkboxTickImg,
                    { tintColor: this.props.color },
                  ]}
                />
              </View>
            ) : (
              <View style={styles.uncheckedCheckbox} />
            )}
          </View>
          <Text
            style={[styles.checkboxLabel, { color: this.props.labelColor }]}
          >
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

CustomCheckBox.propTypes = {
  keyValue: PropTypes.number.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  labelColor: PropTypes.string,
  checkedObjArr: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  selectedUI: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  checkboxTickImg: {
    width: "95%",
    height: "95%",
    // backgroundColor: "",
  },

  uncheckedCheckbox: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  checkboxLabel: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
