import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import size from "./assert/size";
import { stringIsEmpty } from "./assert/function";

const CustomButton = (props) => {
  const { title, onPress, type, image } = props;
  return (
    <View style={styles.container}>
      {type === "addIcon" ? (
        <TouchableOpacity
          style={[
            styles.button,
            {
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: size.s10,
            },
          ]}
          onPress={onPress}
        >
          <Text style={styles.text1}>
            {title === undefined
              ? "Nhấn vào"
              : !stringIsEmpty(title)
                ? title
                : "Nhấn vào"}
          </Text>
          <Image source={image} style={styles.image} />
        </TouchableOpacity>
      ) : (
          <TouchableOpacity
            style={[styles.button, { width: width - size.s160 }]}
            onPress={onPress}
          >
            <Text style={styles.text}>
              {title === undefined
                ? "Nhấn vào"
                : !stringIsEmpty(title)
                  ? title
                  : "Nhấn vào"}
            </Text>
          </TouchableOpacity>
        )}
    </View>
  );
};
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    // width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: size.s20,
  },
  button: {
    backgroundColor: "#F36F20",
    borderColor: "#F36F20",
    borderRadius: size.s30,
    borderWidth: size.s2,
  },
  text: {
    color: "#000000",
    fontSize: size.h32,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    paddingVertical: size.s15,
    textAlign: "center",
  },
  text1: {
    color: "#000000",
    fontSize: size.h24,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    padding: size.s15,
    textAlign: "center",
  },
  image: {
    width: size.s40,
    height: size.s25,
    resizeMode: "contain",
  },
});

export { CustomButton };
