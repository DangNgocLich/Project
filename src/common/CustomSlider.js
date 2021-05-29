import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Platform } from "react-native";
import { View, Text } from "react-native";
import size from "../common/assert/size";
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty, formatMoney
} from "../common/assert/function";
const Slider = (props) => {
  const {
    valueRange,
    markerSize,
    pressMarkerSize,
    sliderLength,
    min,
    max,
    minOverlapValue,
    step,
    markerColor,
    trackColor,
    fontStyle, barColor
  } = props;
  const [multiSliderValue, setMultiSliderValue] = useState(
    !objectIsNull(valueRange) ? valueRange : [0, 100]
  );
  const multiSliderValuesChange = (values) => setMultiSliderValue(values);

  const FindOverlapValue = (minOverlapValue) => {
    if (!objectIsNull(sliderLength) && !objectIsNull(valueRange)) {
      let distanceValue = valueRange[1] - valueRange[0];
      let overlapDistance = minOverlapValue / distanceValue;
      return sliderLength * overlapDistance;
    }
    return 0;
  };
  return (
    <View style={{ justifyContent: "center", alignContent: "center" }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={fontStyle}>{formatMoney(multiSliderValue[0])}---</Text>
        <Text style={fontStyle}>{formatMoney(multiSliderValue[1])}</Text>
      </View>
      <MultiSlider
        markerStyle={{
          ...Platform.select({
            ios: {
              height: !objectIsNull(markerSize) ? markerSize : 20,
              width: !objectIsNull(markerSize) ? markerSize : 20,
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 1,
              shadowOpacity: 0.1,
            },
            android: {
              height: !objectIsNull(markerSize) ? markerSize : 20,
              width: !objectIsNull(markerSize) ? markerSize : 20,
              borderRadius: 50,
              backgroundColor: !objectIsNull(markerColor)
                ? markerColor
                : "#1792E8",
            },
          }),
        }}
        pressedMarkerStyle={{
          ...Platform.select({
            android: {
              height: !objectIsNull(pressMarkerSize) ? pressMarkerSize : 20,
              width: !objectIsNull(pressMarkerSize) ? pressMarkerSize : 20,
              borderRadius: 20,
              backgroundColor: !objectIsNull(markerColor)
                ? markerColor
                : "#1792E8",
            },
          }),
        }}
        selectedStyle={{
          backgroundColor: !objectIsNull(barColor) ? barColor : "#1792E8",
        }}
        trackStyle={{
          backgroundColor: !objectIsNull(trackColor) ? trackColor : "#CECECE",
        }}
        touchDimensions={{
          height: 40,
          width: 40,
          borderRadius: 20,
          slipDisplacement: 40,
        }}
        values={[multiSliderValue[0], multiSliderValue[1]]}
        sliderLength={!objectIsNull(sliderLength) ? sliderLength : 100}
        onValuesChange={multiSliderValuesChange}
        min={
          !objectIsNull(min)
            ? min
            : !objectIsNull(valueRange)
              ? valueRange[0]
              : 0
        }
        max={
          !objectIsNull(max)
            ? max
            : !objectIsNull(valueRange)
              ? valueRange[1]
              : 100
        }
        step={!objectIsNull(step) ? step : 1}
        allowOverlap={false}
        minMarkerOverlapDistance={
          !objectIsNull(minOverlapValue) ? FindOverlapValue(minOverlapValue) : 0
        }
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={fontStyle}>{!objectIsNull(min) ? formatMoney(min) : formatMoney(valueRange[0])}</Text>
        <Text style={fontStyle}>{!objectIsNull(max) ? formatMoney(max) : formatMoney(valueRange[1])}</Text>
      </View>
    </View>
  );
};

export default Slider;
