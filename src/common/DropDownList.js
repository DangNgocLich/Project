import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import size from './assert/size'
import color from './assert/color'
import image from './image/index'
import { convertMoney, convertTime } from '../common/functions'
import CustomBackground from './CustomBackground'
class DropDownList extends Component {


  constructor(props) {
    super(props)
    this.state = {
      isShowContent: false
    }
  }


  componentDidMount() {
    this.setState({ isShowContent: false })
  }

  componentDidUpdate() {
  }

  render() {

    let icon = ''
    if (this.props.data.count !== 0 && this.state.isShowContent) {
      icon = image.arrow_up_TDV
    } else if (this.props.data.count !== 0 && !this.state.isShowContent) {
      icon = image.ic_arrowDown
    }
    return (
      <View
        style={{
          flex: 1,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.props.data.count !== 0) {
              if (this.props.index === 0) {
                this.props.showContent(!this.state.isShowContent)
              }
              this.setState({
                isShowContent: !this.state.isShowContent
              })
            }
          }}
        >

          <View style={[{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: size.s30
          }, this.props.styleView]}>
            <Text style={{
              color: this.props.color,
              fontSize: size.s30,
              paddingVertical: this.props.typeLabel === "đơn thu" ? size.s15 : size.s30,
              fontWeight: "600",
              fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
            }}>{this.props.label}</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{
                color: this.props.color,
                fontSize: size.s30,
                paddingVertical: this.props.typeLabel === "đơn thu" ? size.s15 : size.s20,
                fontWeight: "600",
                fontFamily: Platform.OS == 'android' ? 'sans-serif-medium' : null,
              }}>{this.props.data.count}</Text>

              {
                !this.props.disableShowDetail &&
                <Image
                  resizeMode='contain'
                  source={icon}
                  style={{
                    tintColor: this.props.color,
                    width: size.s30,
                    height: size.s30,
                    marginLeft: size.s20,
                    marginRight: size.s10
                  }}
                />
              }

            </View>
          </View>

        </TouchableWithoutFeedback>

        {
          this.state.isShowContent && !this.props.disableShowDetail &&
          <View style={{ flex: 1 }}>
            {
              (this.props.data !== null && this.props.data !== undefined
                && this.props.data.taskList !== undefined && this.props.data.taskList !== null &&
                this.props.data.taskList.length >= 0) && this.props.data.taskList.map((item, index) => {
                  let backgroundColor = ''
                  let money = '0'

                  {/* if (this.props.type === 'paymentAmount') {
                    money = convertMoney(item.receiveAmount + item.discountAmount)
                  } else if (this.props.type === 'half') {
                    money = convertMoney(item.paymentAmount)
                  } else {
                    money = convertMoney(item.paymentAmount + item.receiveAmount + item.discountAmount)
                  } */}

                  switch (this.props.type) {
                    case 'delivered':
                      backgroundColor = color.informationBold
                      
                      money = convertMoney(parseInt(item.paymentAmount)+parseInt(item.receiveAmount)+parseInt(item.discountAmount))
                      break;
                    case 'success':
                      backgroundColor = "#00640D"
                      money = convertMoney(parseInt(item.paymentAmount)+parseInt(item.receiveAmount)+parseInt(item.discountAmount))
                      break;
                    case 'half':
                      backgroundColor = color.primaryMedium
                      money = convertMoney(parseInt(item.paymentAmount)+parseInt(item.receiveAmount)+parseInt(item.discountAmount))
                      break;
                    case 'exist':
                      backgroundColor = color.alertBold
                      money = convertMoney(parseInt(item.paymentAmount)+parseInt(item.receiveAmount)+parseInt(item.discountAmount))
                      break;
                      
                    case 'cancel':
                      
                      backgroundColor = color.dangerBold
                      money = convertMoney(parseInt(item.paymentAmount)+parseInt(item.receiveAmount)+parseInt(item.discountAmount))
                      break;
                    case 'paymentAmount':
                      backgroundColor = color.informationMedium
                      money = convertMoney(item.receiveAmount)
                      break
                    case 'existAmount':
                      backgroundColor = "#575A89"
                      money = convertMoney(item.receiveAmount)
                      break
                    case 'debtAmount':
                      backgroundColor = color.dangerBold
                      money = convertMoney(item.receiveAmount)
                      break
                    case 'existDebtAmount':
                      backgroundColor = color.dangerBold
                      money = convertMoney(item.receiveAmount)
                      break
                    default:
                      break;
                  }
                  return (
                    <View style={{
                      flexDirection: 'row',
                      marginVertical: 1,
                    }}>
                      <CustomBackground
                        backgroundColor={backgroundColor}
                        opacity={0.15}
                      />
                      <View style={{
                        flex: 1,
                        paddingHorizontal: size.s30,
                        paddingVertical: size.s10
                      }}>
                        <Text style={{
                          fontSize: size.s30,
                          fontWeight: "700",
                          fontFamily: Platform.OS == "android" ? "sans-serif-medium" : null,
                          paddingVertical: size.s10,

                        }}>{item.odID}</Text>
                        <Text style={styles.normalText}>{item.cus_name}</Text>
                      </View>
                      <View style={{
                        flex: 1,
                        paddingHorizontal: size.s30,
                        paddingVertical: size.s10
                      }}>

                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                          <Image
                            resizeMode='contain'
                            source={image.clock}
                            style={{
                              width: size.s30,
                              height: size.s30,
                              tintColor: color.text,
                              marginRight: size.s5
                            }}
                          />
                          <Text style={styles.normalText}>{convertTime(item.create_time)}</Text>
                        </View>

                        <Text style={styles.normalText}>
                          {money}
                        </Text>
                      </View>

                    </View>
                  )
                })
            }
          </View>
        }

      </View>
    );
  }

}

const styles = StyleSheet.create({
  normalText: {
    fontSize: size.s30,
    paddingVertical: size.s10,
    fontWeight: "500",
  }
})

DropDownList.defaultProps = {
  data: {
    count: 0,
    taskList: []
  }
}

export default DropDownList