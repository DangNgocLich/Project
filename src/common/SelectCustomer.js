import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native'
import { connect } from "react-redux";
import { getCustomertSAction } from "../../app/boston_sale/redux/actions/index";
import Select from './Select'
import size from './assert/size'
import color from './assert/color'
import { userProfile } from '../../app/boston_sale/config/settings'
import { appId } from "../../config/settings";

class SelectCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      selectedCustomer: this.props.selectedCustomer,
      currentCustomerID: '',

      pageCus: 0,
      pageSizeCus: 10,
      refreshingCus: false,

      searchText: '',
      typing: false,
      typingTimeout: 0,
      isSearching: false,
      isLoadMore: false,
      
      modalSelectId: 0
      
    }
  }

  componentDidMount() {
    if (userProfile.partnrType !== 0) {
      this.didFocusListener = this.props.navigation.addListener(
        'didFocus',
        () => {

          // this.setState({ selectedCustomer: userProfile.customerInfo }, () => {
          //   console.log(666666666666, this.state.selectedCustomer)
          // })
        }
      )
    }
    this.setState({
      customer: [],
    }, () => {
      this.getCustomerList()

    })

    // this.setState({
    //   searchText: ''
    // }, () => {
    // })
    // this.setState({ currentCustomerID: userProfile.customerID }, () => {
    // })
    // this.getCustomerList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.defaultValue !== undefined
      && this.props.defaultValue !== prevProps.defaultValue) {
      this.setState({
        selectedCustomer: this.props.defaultValue
      }, () => {
      })
    }

    if (this.props.customer.isFetching !== prevProps.customer.isFetching && !this.props.customer.isFetching) {
      if (this.props.customer.error !== undefined) {
        Alert.alert(
          "Thông báo",
          this.props.error,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else if (this.props.customer !== null) {
        if (this.props.customer.error !== undefined && this.props.customer.error.message !== undefined) {
          Alert.alert(
            "Thông báo",
            this.props.customer.error.message.value,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          )
        } else {
          if (this.props.customer.data != undefined) {
            let customer = []
            let selectedCustomer = undefined
            if (this.props.customer.data.results != undefined && this.props.customer.data.results != undefined) {
              if (this.props.customer.data.results.length <= 0 || this.state.pageCus === 5) {
                this.setState({ isLoadMore: false })
              } else if (this.state.pageCus === 1 && this.props.customer.data.results.length >= this.state.pageSizeCus) {
                this.setState({ isLoadMore: true })
              }
              this.props.customer.data.results.map((x) => {
                // if (this.state.currentCustomerID !== '' && x.customerID === this.state.currentCustomerID) {
                //   selectedCustomer = {
                //     code: x.customerID,
                //     label: x.name,
                //     address: x.address,
                //     creditLimit: x.creditLimit,
                //     debt: x.debt,
                //     ghtc: x.ghtc
                //   }
                // }
                customer.push({
                  code: x.customerID,
                  label: x.name,
                  address: x.address,
                  creditLimit: x.creditLimit,
                  debt: x.debt,
                  ghtc: x.ghtc,
                  cus_token: x.token_id,
                })
              })
            }
            this.setState({
              customer: [...this.state.customer, ...customer],
              // selectedCustomer: selectedCustomer,
              refreshingCus: false,
              isSearching: false
            })
          }

        }
      }
    }
  }

  getCustomerList = () => {
    let filter = []
    if (appId === 2) {
      if (userProfile.partnrType === 4) {
        filter.push(`managerID eq ` + "'" + `${userProfile.token_id}` + "'")
      } else {
        filter.push(`deliveryID eq ` + "'" + `${userProfile.token_id}` + "'")
      }
    } else {
      if (userProfile.partnrType === 2) {
        filter.push(`managerID eq ` + "'" + `${userProfile.token_id}` + "'")
      } else {
        filter.push(`tdvID eq ` + "'" + `${userProfile.token_id}` + "'")
      }

    }

    if (this.state.searchText !== undefined) {
      filter.push(`search eq ` + "'" + `${this.state.searchText}` + "'")
    }

    this.props.getCustomertSAction({
      filter: filter,
      skip: this.state.pageCus,
      top: this.state.pageSizeCus
    })

  }

  setTime = () => {
    let tmp = setTimeout(() => {

    })
  }

  render() {
    return (
      <Select
        modalSelectId= {this.state.modalSelectId}
        isSearch
        size={size.s30}
        borderColor={color.secondaryBold}
        style={{
          borderColor: color.secondaryBold,
          flex: 1,
          paddingRight: size.s20,
        }}
        defaultValue={this.state.selectedCustomer !== '' ? this.state.selectedCustomer : undefined}
        placeholder="Chọn khách hàng"
        borderDefaultColor={color.secondaryBold}
        listItem={this.state.customer}
        itemType='select-client'
        onChooseItem={(item) => {
          this.props.onChooseItem(item)
          if (this.state.searchText !== '') {
            this.setState({
              searchText: '',
              pageCus: 0,
            }, () => {
              this.getCustomerList()
            })
          }

          // this.setState({
          //   selectedCustomer: item
          // }, () => {
          // })
        }}
        // loading={this.props.customer.isFetching}
        isSearching={this.state.isSearching}
        onClose={() => {
          this.setState({
            customer: [],
            pageCus: 0,
            searchText: ''
          }, () => {
            this.getCustomerList()
          })
        }}
        onSearching={(text) => {
          if (text === '') {
            this.setState({ isSearching: false })
          }
          if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
          }
          this.setState({
            customer: [],
            pageCus: 0,
            typing: false,
            isSearching: true,
            searchText: text,
            typingTimeout: setTimeout(() => {
              this.getCustomerList(text)
            }, 1000)
          })

          // if (this.state.searchText !== text) {
          //   let timeout = () => setTimeout(() => {
          //     this.getCustomerList(text)
          //   }, 2000)


          //   if (this.state.searchText === text) {
          //     clearTimeout(timeout())
          //     this.setState({
          //       pageCus: 0,
          //       searchText: text,
          //       typing: true
          //     }, () => {
          //       timeout()
          //     })
          //   }

          // if (this.state.searchText !== text) {
          //   // console.log(this.state.searchText)
          //   // clearTimeout(timeout)
          //   this.setState({
          //     pageCus: 0,
          //     searchText: text,
          //     typing: true
          //   }, () => {
          //     // clearTimeout(timeout)
          //     console.log(1, this.state.searchText)
          //   })

          // } else {
          //   this.setState({
          //     typing: false
          //   })
          //   console.log(2, this.state.searchText)

          // }
          // this.setState({
          //   pageCus: 0,
          //   searchText: text
          // })
        }
        }
        onRefresh={() => {
          this.setState({
            customer: [],
            pageSizeCus: 20,
            pageCus: 0
          }, () => {
            this.getCustomerList()
          });
        }}
        loadMore={() => {
          if (this.state.pageCus === 0 && this.state.customer.length >= this.state.pageSizeCus) {
            this.setState({
              isLoadMore: true
            })
          }
          if (this.state.pageCus < 5) {
            this.setState({
              pageCus: ++this.state.pageCus,
            }, () => {
              this.getCustomerList()
            });
          }
        }}
        isLoadMore={this.state.isLoadMore}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomertSAction: (data) => {
      dispatch(getCustomertSAction(data));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    customer: {
      isFetching: state.getCustomerBSReducers.isFetching,
      data: state.getCustomerBSReducers.data,
      error: state.getCustomerBSReducers.error,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCustomer);
