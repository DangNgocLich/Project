import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import size from "../common/assert/size";
import color from "../common/assert/color";
import image from "../common/image/index";
import Button from "../common/Button";
import CustomBackground from "../common/CustomBackground";
import { convertMoney } from '../common/functions'
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
class CustomerItemView extends React.PureComponent {
  // const CustomerItemView = forwardRef((props, ref) => {
  state = {
    disable: false
  }
 
  componentDidUpdate(prevProps) {
    // if (this.props.data.isInCart) {
    //   this.setState({ disable: this.props.data.isInCart }, () => {
    //     console.log(this.state.disable)
    //   })
    // }

  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.selectedItem !== this.props.selectedItem) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  render() {
    let { item, selectedItem } = this.props;
   
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress()
          // handleClose(() => {
          //   setSelectedItem(item);
          //   this.props.onChooseItem(item);
          // });
        }}
      >
        <CustomBackground
          backgroundColor={
            item === selectedItem ? color.secondaryMedium : "#ffffff"
          }
          opacity={item === selectedItem ? 0.15 : 1}
        />
        <View
          style={{
            width: Dimensions.get("window").width * 0.9,
            paddingVertical: size.s20,
            paddingHorizontal: size.s40,
            borderBottomColor: color.secondaryBold,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: size.s5,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: size.s35 * 0.9,
                color: color.primaryBold,
                fontWeight: "500",
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                maxWidth: Dimensions.get("window").width * 0.5
              }}
            >
              {item.label}
            </Text>


            <Text
              style={{
                fontSize: size.s25,
                color: color.secondaryBold,
                fontWeight: "400",
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                paddingRight: size.s30
              }}
            >
              {item.code}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              paddingVertical: size.s5,
            }}
          >
            <Text
              style={{
                fontSize: size.s25,
                color: color.primaryBold,
                fontWeight: "500",
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
              }}
            >
              {item.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

};

CustomerItemView.defaultProps = {
};
export default CustomerItemView;

const styles = StyleSheet.create({

});
