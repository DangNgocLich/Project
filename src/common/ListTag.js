import React, { Component } from "react";
import { View, FlatList } from "react-native";
import CustomTag from "./CustomTag";
import size from "./assert/size";
const list = [
  {
    id: "1",
    title: "Đơn mới",
    borderColor: "#003B35",
    fontColor: "#003B35",
    color: "white",
  },
  {
    id: "2",
    title: "Phát lại",
    borderColor: "None",
    fontColor: "#C79400",
    color: "rgba(255, 196, 0, 0.15)",
  },
  {
    id: "3",
    title: "< 7 ngày",
    borderColor: "None",
    fontColor: "#B3202E",
    color: "rgba(235, 87, 87, 0.15)",
  },
];
export default class ListTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal={true}
          data={this.props.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{ flexDirection: "column", marginHorizontal: size.s30 }}
            >
              <CustomTag
                title={item.title}
                color={item.color}
                borderColor={item.borderColor}
                fontColor={item.fontColor}
                onPress={(value) => {
                   console.log("list", value)
                }}
                styles={item.borderColor==="None"?{borderWidth:0}:{}}
                list={this.state.checkedList}
                object={item}
                click={false}
              ></CustomTag>
            </View>
          )}
        ></FlatList>
      </View>
    );
  }
}
