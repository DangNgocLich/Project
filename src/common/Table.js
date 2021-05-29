import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import color from "./assert/color";
import size from "./assert/size";
import img from "./image/index"

import CustomBackground from "../common/CustomBackground";
import image from "./image";
import { objectIsNull } from '../common/assert/function'

const Table = forwardRef((props, ref) => {
  const {
    title,
    headers,
    rows,
    commonHeaderStyle,
    commonRowStyle,
    imgTitle,
    styleImg,
    unit,
    chooseItem,
    renderItemTable,
    borderBottom,
    onSelectedItems,
  } = props;
  useEffect(() => { });

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      {title != undefined ?
        (unit === undefined ?
          <Text
            style={{
              color: color.primaryBold,
              fontWeight: "500",
              fontSize: size.s35,
              fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
              paddingVertical: size.s30,
            }}
          >
            {title}
          </Text>
          :
          <View
            style={{
              width: '100%',
              paddingLeft: size.s60,
              paddingRight: size.s30,
              paddingTop: size.s30,
              paddingBottom: unit !== '' ? 0 : size.s20
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: !objectIsNull(borderBottom) ? borderBottom : color.primaryRegular,
                borderBottomWidth: size.s5
              }}
            >
              <Image
                source={imgTitle}
                style={{ width: size.s50, height: size.s45 }}
                resizeMode={"contain"}
              />
              <View style={{}}>
                <Text
                  style={{
                    flex: 1,
                    color: color.primaryBold,
                    fontWeight: "500",
                    fontSize: size.s35,
                    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                    padding: size.s20,
                  }}
                >
                  {title}
                </Text>
              </View>
              {chooseItem}
            </View>
            {unit !== '' &&
              <Text
                style={{
                  color: color.primaryBold,
                  fontWeight: "500",
                  fontSize: size.h24,
                  fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
                  textAlign: 'right',
                  paddingVertical: size.s10
                }}
              >
                {unit}
              </Text>}
          </View>)
        : null}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        {headers.map((item, index) => {
          return (
            <Header
              commonHeaderStyle={commonHeaderStyle}
              data={item}
              key={index}
              total={headers.length}
              index={index}
            />
          );
        })}
      </View>

      {rows.map((row, rowIndex) => {
        return (
          <View
            key={rowIndex}
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            {row.map((item, index) => {
              return (
                <RowItem
                  commonRowStyle={commonRowStyle}
                  renderItemTable={renderItemTable}
                  data={item}
                  key={index}
                  total={rows.length}
                  index={index}
                  rowIndex={rowIndex}
                  onSelectedItems={onSelectedItems}
                  row={row}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
});

Table.defaultProps = {
  rows: [],
  columns: [],
};

const Header = (props) => {
  const { data, commonHeaderStyle } = props;

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: "center",
          justifyContent: "center",
          marginLeft: props.index === 0 ? 0 : 1,
          marginRight: props.index === props.total - 1 ? 0 : 1,
          marginVertical: 1,
        },
        commonHeaderStyle !== undefined &&
        commonHeaderStyle.style !== undefined &&
        commonHeaderStyle.style,
        data.style,
      ]}
    >
      <CustomBackground
        style={[
          commonHeaderStyle !== undefined &&
          commonHeaderStyle.backgroundStyle !== undefined &&
          commonHeaderStyle.backgroundStyle,
          data.backgroundStyle !== undefined && data.backgroundStyle,
        ]}
      />
      {data.image !== undefined && (
        <View style={{ width: size.h34, alignItems: 'center', paddingRight: size.s10 }}>
          <Image source={data.image} style={data.styleImg} />
        </View>
      )}
      <Text
        style={[
          {
            paddingVertical: size.s20,
            fontWeight: "600",
            fontSize: size.s30,
            paddingHorizontal: size.s10,
            fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
            textAlign: "center",
          },
          commonHeaderStyle !== undefined &&
          commonHeaderStyle.textStyle !== undefined &&
          commonHeaderStyle.textStyle,
          data.textStyle,
        ]}
      >
        {data.label}
      </Text>
    </View>
  );
};

const RowItem = (props) => {
  const { data, index, commonRowStyle, renderItemTable, rowIndex, onSelectedItems, row } = props;
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: props.index === 0 ? 0 : 1,
          marginRight: props.index === props.total - 1 ? 0 : 1,
          marginVertical: 1,
        },
        commonRowStyle !== undefined &&
        commonRowStyle.style !== undefined &&
        commonRowStyle.style,
        data.style,
      ]}
    >
      <CustomBackground
        style={[
          commonRowStyle !== undefined &&
          commonRowStyle.backgroundStyle !== undefined &&
          commonRowStyle.backgroundStyle,
          data.backgroundStyle !== undefined && data.backgroundStyle,
        ]}
      />
      {renderItemTable ? renderItemTable(data, index, rowIndex, row, onSelectedItems) :
        <Text
          style={[
            {
              paddingVertical: size.s20,
              fontSize: size.s30,
              paddingHorizontal: size.s10,
              textAlign: "center",
            },
            commonRowStyle !== undefined &&
            commonRowStyle.textStyle !== undefined &&
            commonRowStyle.textStyle,
            data.textStyle,
          ]}
        >
          {data.label}
        </Text>}
    </View>
  );
};

export default Table;
