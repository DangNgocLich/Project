import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import size from "../common/assert/size";
import { objectIsNull, stringIsEmpty } from "../common/assert/function";
import image from "./image";

const CustomTextInput = (props) => {
  const [item, setItem] = useState(props.item);
  const [text, setText] = useState(props.text);
  const [focused, setFocused] = useState(false);
  const imageChange = image.input
  useEffect(() => {
    setItem(props.item);
    setText(props.text);
  }, [props.item, props.text]);
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: !stringIsEmpty(item.note) || item.type !== undefined ? size.s20 : !stringIsEmpty(item.paddingBottom) ? item.paddingBottom : size.s50,
        },
      ]}
    >
      {!stringIsEmpty(item.title) ? (
        <Text style={styles.title}>{item.title}</Text>
      ) : null}
      <View
        style={[
          styles.viewInput,
          {
            backgroundColor: focused ? "rgba(89, 198, 188, 0.2)" : "#FBFBFB",
          },
        ]}
      >
        <View style={styles.viewImg}>
          <Image source={item.first === true ? (focused ? imageChange : item.image) : item.image} style={styles.image} />
        </View>
        <TextInput

          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          defaultValue={text}
          editable={!objectIsNull(item.editable) ? item.editable : true}
          placeholder={!stringIsEmpty(item.placeHolder) ? item.placeHolder : ""}
          placeholderTextColor={"#003B35"}
          style={styles.textInput}
          secureTextEntry={!objectIsNull(item.tag) ? item.tag : false}
          onChangeText={props.onChangeText}
        />
        {item.imageRight !== undefined ? (
          <TouchableOpacity style={styles.viewImg} onPress={
            () => {

              props.onPressRight()
            }}>
            <Image source={item.imageRight} style={styles.imageRight} />
          </TouchableOpacity>
        ) : (
            <View style={styles.viewImg} />
          )}
      </View>
      {!stringIsEmpty(item.note) ? (
        <View style={styles.viewNote}>
          <TouchableOpacity
            onPress={props.onPressNote}
            disabled={!objectIsNull(item.disabled) ? item.disabled : false}
          >
            <Text style={[styles.note, props.styleNote]}>{item.note}</Text>
          </TouchableOpacity>
        </View>
      ) : item.type === 'forgot' ?
          <View style={{
            paddingTop: size.s10,
            alignItems: 'flex-end',
          }}>
            <TouchableOpacity
              onPress={props.onPressNote}
              disabled={!objectIsNull(item.disabled) ? item.disabled : false}
            >
              <Image source={image.forget} style={{ width: size.s160 + size.s10, height: size.s55, resizeMode: 'contain' }} />
            </TouchableOpacity>
          </View>
          : <View />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    color: "#003B35",
    fontSize: size.h32,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    paddingBottom: size.s10,
  },
  viewInput: {
    flexDirection: "row",
    borderWidth: size.s2,
    borderColor: "#003B35",
    borderRadius: size.s30,
  },
  textInput: {
    flex: 1,
    color: "#003B35",
    paddingVertical: size.s15,
    paddingRight: size.s30,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    fontSize: size.h32,
    alignItems: "center",
  },
  viewImg: {
    width: size.s90,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: size.s40,
    height: size.s40,
    resizeMode: "contain",
  },
  imageRight: {
    width: size.s30,
    height: size.s30,
    resizeMode: "contain",
  },
  viewNote: {
    width: "100%",
    alignItems: "flex-end",
  },
  note: {
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    // fontSize: size.h24,
    color: '#003B35'
  },
});
export { CustomTextInput };
