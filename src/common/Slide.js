import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, Animated, TouchableWithoutFeedback, Modal, Dimensions, ScrollView } from "react-native";
import color from "./assert/color";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Slide = forwardRef((props, ref) => {
  const time = props.time;
  const [onSlide, setOnSlide] = useState(false);
  const _animatedSlide = useRef(new Animated.Value(0)).current
  const innerRef = React.useRef()
  let slideData = {};
  if (props.type === "down") {
    Object.assign(slideData, {
      from: -1000,
      to: 0,
    });
  } else {
    Object.assign(slideData, {
      from: 1000,
      to: 0,
    });
  }
  useEffect(() => {
    if (onSlide) {
      Animated.timing(_animatedSlide, {
        toValue: 1,
        duration: time,
        useNativeDriver: false,
      }).start();
      console.log(_animatedSlide)

    } else {
    }
  }, [onSlide]);

  handleOpen = () => {
    setOnSlide(true);
    // Animated.timing(_animatedSlide, {
    //   toValue: 1,
    //   duration: time,
    //   useNativeDriver: false
    // }).start()
  };

  function handleOpenCopy() {
    setOnSlide(true);
  };

  handleClose = (callback) => {
    Animated.timing(_animatedSlide, {
      toValue: 0,
      duration: time,
      useNativeDriver: false,
    }).start();
    setTimeout(async () => {
      setOnSlide(false);
      if (callback !== undefined) {
        await callback();
      }
    }, time);
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        props.checkWork === true ? handleOpenCopy() : handleOpen();
      },
      close: () => {
        handleClose(() => {
          props.onClose()
        });
      },
    }
  });

  return (
    <Modal animationType="none" transparent={true} visible={onSlide}>
      <TouchableWithoutFeedback
        onPress={() => {
          handleClose(() => {
            props.onClose()
          })
        }}
      >
        <View
          style={{
            backgroundColor: color.popupBackground,
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: _animatedSlide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [slideData.from, slideData.to],
                  }),
                },
              ],
              alignSelf: "center",
              flex: 1,
              justifyContent: props.position,
              // maxHeight: height * 0.7,
              // minHeight: height * 0.3,
            }}
          >
            <TouchableWithoutFeedback>
              {props.children}
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

Slide.defaultProps = {
  position: "flex-end",
  type: "up",
  time: 300,
  checkWork: false,
  onClose: () => {

  },
  contentType: ''
};

export default Slide;


const ProductList = (props) => {

}