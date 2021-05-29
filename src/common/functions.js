import AsyncStorage from '@react-native-community/async-storage'

export const convertTime = (time) => {
  return time.substring(0, 2) + ':' + time.substring(2, 4) + ':' + time.substring(4, 6)
}


export const convertDate = (date, type) => {
  let day = date.substring(6, 8)
  let month = date.substring(4, 6)
  let year = date.substring(0, 4)
  switch (type) {
    case 'date-month':
      return day + '/' + month
      break;
    default:
      return day + '/' + month + '/' + year
      break;
  }
}

export const getCurrentDate = (type) => {
  let currentDate = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))
  let day = currentDate.getUTCDate()
  if (day < 10) {
    day = '0' + day
  }
  let month = (currentDate.getUTCMonth() + 1).toString()
  if (month < 10) {
    month = '0' + month
  }
  let year = currentDate.getUTCFullYear().toString()
  switch (type) {
    case 'date-month-year':
      return day + '/' + month + '/' + year
      break;
    case 'calendar':
      return year.toString() + '-' + month.toString() + '-' + day.toString()
    default:
      return year.toString() + month.toString() + day.toString()
      break;
  }
}

export const convertMoney = (_text, type) => {
  // let tmp = ''

  // for (let i = money.length - 1; i >= 0; i -= 3) {
  //   if (money[i - 2] !== undefined) {
  //     tmp = tmp + money[i - 2] + money[i - 1] + money[i]

  //   }

  //   if (money[i - 1] !== undefined) {
  //     tmp = tmp + money[i - 1] + money[i]
  //   }

  //   if (money[i] !== undefined) {
  //     tmp = tmp + money[i]
  //   }

  //   console.log(tmp)
  // }

  _text = _text.toString()

  let valueType = 'pos'

  if (parseInt(_text) < 0) {
    valueType = 'nev'
    _text = -_text
    _text = _text.toString()
  }


  if (_text !== undefined) {
    let text = _text.split('.').join('');
    // if(text.split('.').length) ;
    let length = text.length;
    let value = '';
    if (length >= 4) {
      for (let i = length - 1; i >= 0; i = i - 3) {
        value =
          `${text[i - 3] === undefined || text[i - 2] === undefined
            ? ''
            : '.'
          }${text[i - 2] === undefined ? '' : text[i - 2]}${text[i - 1] === undefined ? '' : text[i - 1]
          }${text[i] === undefined ? '' : text[i]}` + value;
      }
      if (valueType === 'nev') {
        value = '- ' + value
      }
      if (type === undefined) {

        return 'đ ' + value;
      } else {
        if (type === 2) {
          return value
        } else {
          return value + ' đ'
        }

      }

    } else {
      if (type === undefined) {
        return 'đ ' + text;
      } else {
        if (type === 2) {
          return text
        } else {
          return text + ' đ'
        }
      }
    }
  } else {
    return '';
  }

}

export const checkAppType = async () => {
  try {
    const value = await AsyncStorage.getItem('appType')
    if (value !== null) {
      return value
    } else {
      setAppType('PROD')
      return 'PROD'
    }
  } catch (e) {
  }
}

export const setAppType = async (type) => {
  try {
    await AsyncStorage.setItem('appType', type)
    return type
  } catch (e) {
  }
}

