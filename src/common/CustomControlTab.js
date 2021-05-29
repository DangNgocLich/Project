import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import { size, Functions } from '@dungdang/react-native-basic'
import size from '../common/assert/size'
import {arrayIsEmpty,objectIsNull,stringIsEmpty} from '../common/assert/function'
const CustomControlTab = (props) => {
    // const { stringIsEmpty, objectIsNull } = Functions
    const {
        onPressLeft,
        onPressRight,
        backgroundColorLeft,
        backgroundColorRight,
        colorLeft,
        colorRight,
        titleLeft,
        titleRight,
    } = props
    return (
        <View style = {styles.controlTab}>
            <TouchableOpacity style = {[styles.touch,{backgroundColor: backgroundColorLeft}]}
            onPress = {() => {
                if (!objectIsNull(onPressLeft)) {
                    onPressLeft(false)
                }
            }}>
                <Text style = {[styles.styleText,{color: colorLeft}]}>
                    {titleLeft === undefined ? 'BUTTON LEFT' : !stringIsEmpty(titleLeft) ? titleLeft : titleLeft.toUpperCase()}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.touch,{backgroundColor: backgroundColorRight}]}
            onPress = {() => {
                if (!objectIsNull(onPressRight)) {
                    onPressRight(true)
                }
            }}>
                <Text style = {[styles.styleText,{color: colorRight}]}>
                    {titleRight === undefined ? 'BUTTON RIGHT' : !stringIsEmpty(titleRight) ? titleRight : titleRight.toUpperCase()}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    controlTab: {
        flexDirection: 'row',
        padding: size.s5,
        width: '96%',
        justifyContent: 'center',
        borderRadius: size.s40,
        backgroundColor: '#E1E1E1',
        margin: size.s15,
        height:size.s70
    },
    touch: {
        width: '50%',
        paddingVertical: size.s20 - size.s15,
        alignItems: 'center',
        borderRadius: size.s40,
    },
    styleText: {
        fontSize: size.s30,
        textAlign: 'center',
    }
});
export {CustomControlTab}