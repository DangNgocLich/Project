import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import size from "../common/assert/size";
import image from "../common/image/index";
import Button from "../common/Button";
import CustomBackground from "../common/CustomBackground";
const currentDay = new Date()
export default class CustomCalendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: 0,
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear(),
      dataHeader: this._header(),
    };
  }

  _createDefaultDateData() {
    const { selectedMonth, selectedYear, selectedDay } = this.state;
    var days = [];
    var dt = new Date();
    dt.setDate(1);
    dt.setMonth(selectedMonth - 1);
    dt.setFullYear(selectedYear);
    var lastDay = new Date(selectedYear, selectedMonth, selectedDay).getDate();
    var prevDay = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDay
    ).getDate();
    var lastDayIndex = new Date(
      selectedYear,
      selectedMonth,
      selectedDay
    ).getDay();
    var nextDays = 7 - lastDayIndex - 1;
    var firstDayIndex = dt.getDay();
    for (var x = firstDayIndex - 1; x > 0; x--) {
      if (firstDayIndex === 0) {
      } else {
        days.push({
          key: prevDay - x + 1 + "",
          isCheck: false,
          day: prevDay - x + 1,
          month: selectedMonth - 1,
          year: selectedYear,
        });
      }
    }
    for (var i = 1; i <= lastDay; i++) {
      days.push({
        key: i + "",
        isCheck: true,
        day: i,
        month: selectedMonth,
        year: selectedYear,
      });
    }
    var next = firstDayIndex === 0 ? 5 - lastDayIndex : nextDays;
    for (var j = 0; j <= next; j++) {
      if (nextDays === 6) {
      } else {
        days.push({
          key: j + 1 + "",
          isCheck: false,
          day: j + 1,
          month: selectedMonth + 1,
          year: selectedYear,
        });
      }
    }
    return days;
  }
  _header() {
    var header = [];
    for (var i = 0; i <= 6; i++) {
      if (i < 6) {
        header.push({
          id: i,
          value_vn: "T" + (i + 2),
          value_en:
            i === 0
              ? "Mon"
              : i === 1
                ? "Tue"
                : i === 2
                  ? "Web"
                  : i === 3
                    ? "Thu"
                    : i === 4
                      ? "Fri"
                      : "Sat",
        });
      } else {
        header.push({
          id: i,
          value_vn: "CN",
          value_en: "Sun",
        });
      }
    }
    return header;
  }
  _title() {
    let header = [];
    for (let item of this.state.dataHeader) {
      header.push(<Text style={styles.txtHeader}>{item.value_vn}</Text>);
    }
    return header;
  }
  _formMonthYear() {
    const { selectedMonth, selectedYear } = this.state;
    return (
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() => {
            if (selectedMonth - 1 < 1) {
              this.setState(
                {
                  selectedMonth: 12,
                },
                () => {
                  this.setState({
                    selectedYear: selectedYear - 1,
                  });
                }
              );
            } else {
              this.setState({
                selectedMonth: selectedMonth - 1,
                selectedYear: selectedYear,
              });
            }
          }}
        >
          <Image source={image.ic_prev} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.title}>
          Tháng {selectedMonth} {selectedYear}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (selectedMonth + 1 > 12) {
              this.setState(
                {
                  selectedMonth: 1,
                },
                () => {
                  this.setState({
                    selectedYear: selectedYear + 1,
                  });
                }
              );
            } else {
              this.setState({
                selectedMonth: selectedMonth + 1,
                selectedYear: selectedYear,
              });
            }
          }}
        >
          <Image source={image.next} style={styles.img} />
        </TouchableOpacity>
      </View>
    );
  }
  _tableOfContents() {
    const { content, image } = this.props;
    return (
      <View
        style={[
          styles.viewContent,
          {
            justifyContent: image !== undefined ? "space-between" : "center",
            paddingHorizontal: image !== undefined ? size.s50 : 0,

          },
        ]}
      >
        <Text style={styles.txtContent}>{content}</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.onPressClose();
          }}
        >
          <Image source={image} style={{ width: size.s35, height: size.s35 }} />
        </TouchableOpacity>
      </View>
    );
  }
  _selection() {
    const { notStandard } = this.props
    return (
      <View style={styles.viewSelection}>
        {notStandard === 'notStandard' ? <View /> :
          <Button
            label="Giao hàng tiêu chuẩn"
            backgroundColor={"#F36F20"}
            textStyle={{ paddingVertical: size.s15 }}
            onPress={() => {
              this.props.onPressDefault()
            }}
          />}
        <Button
          onPress={() => {
            this.props.onPressSubmit(this.state.selectedDay)
          }}
          label="Xác nhận"
          backgroundColor={"#F36F20"}
          style={{
            paddingVertical: size.s15
          }}
        />
      </View>
    );
  }
  render() {
    const { scrollDay, content, image } = this.props;
    return (
      <View style={styles.container}>
        {content !== undefined || image !== undefined ? (
          this._tableOfContents()
        ) : (
            <View />
          )}
        <ScrollView>

          <View style={{ alignItems: "center" }}>
            {this._formMonthYear()}
            <View style={styles.viewHeader}>{this._title()}</View>
            <FlatList
              numColumns={7}
              data={this._createDefaultDateData()}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.key}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",

                      height: size.h65,
                      marginHorizontal: size.s10,
                      marginVertical: size.s20,

                    }}
                  >
                    <CustomBackground
                      style={{
                        borderRadius: size.s100,
                        backgroundColor:
                          scrollDay.day === item.day &&
                            scrollDay.month === item.month
                            ? "rgba(243, 111, 32, 0.15)"
                            : "#fff",
                      }}
                    />
                    <TouchableOpacity
                      style={{

                        width: size.h65,
                        height:
                          scrollDay.day === item.day &&
                            scrollDay.month === item.month
                            ? size.h65
                            : size.h44,
                        justifyContent: "center",
                        borderWidth:
                          scrollDay.day === item.day &&
                            scrollDay.month === item.month
                            ? size.s2
                            : 0,
                        borderRadius:
                          scrollDay.day === item.day &&
                            scrollDay.month === item.month
                            ? size.s100
                            : 0,
                        borderColor:
                          scrollDay.day === item.day &&
                            scrollDay.month === item.month
                            ? "#B93D00"
                            : "#fff",
                      }}
                      onPress={() => {
                        if (item.isCheck) {
                          this.props.onPress(item);

                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.items,
                          {
                            color:
                              scrollDay.day === item.day &&
                                scrollDay.month === item.month
                                ? "#B93D00"
                                : item.isCheck === true
                                  ? item.day === new Date().getDate() &&
                                    item.month === new Date().getMonth() + 1
                                    ? "#B93D00"
                                    : "#003B35"
                                  : "#979797",
                          },
                        ]}
                      >
                        {item.day}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            {this._selection()}
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: size.s30,
    borderTopLeftRadius: size.s30,
  },
  viewContent: {
    flexDirection: "row",
    backgroundColor: "#F36F20",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: size.s30,
    borderTopLeftRadius: size.s30,
  },
  txtContent: {
    fontSize: size.h40,
    fontWeight: "600",
    fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
    paddingVertical: size.h24,
  },
  viewTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: size.s50,
  },
  items: {
    fontSize: size.h28,
    textAlign: "center",
  },
  viewHeader: {
    flexDirection: "row",
    borderBottomColor: "#979797",
    borderBottomWidth: size.s5 - size.s2,
  },
  txtHeader: {
    color: "#003B35",
    fontSize: size.h32,
    paddingHorizontal: size.h22,
    paddingVertical: size.s5,
  },
  img: {
    width: size.h24,
    height: size.s20,
  },
  title: {
    color: "#003B35",
    fontSize: size.h32,
    width: "40%",
    textAlign: "center",
  },
  viewSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: size.s50,
  },
});
