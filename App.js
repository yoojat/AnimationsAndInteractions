import styled from 'styled-components/native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Text,
  //   Dimensions,
  //   Easing,
  // Pressable,
  //   TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import icons from './icons';

const BLACK_COLOR = '#1e272e';
const GREY = '#485460';
const GREEN = '#2ecc71';
const RED = '#e74c3c';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BLACK_COLOR};
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  /* 안드로이드에서는 elevation이라는 prop을 전달해주어야 box-shadow를 사용할 수 있음 */
  position: absolute;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

// const AnimatedBox = Animated.createAnimatedComponent(Box);

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    // extrapolate: 'identity', // clamp: 한계를 정해줌, identity : 끝에 가면 이상하게 됨(?) extend: 한계치를 넘어서 실행
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: 'clamp',
  });

  // Animations
  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });

  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
  });

  // const [y, setY] = useState(0);
  // const [intervalId, setIntervalId] = useState(null);
  // const moveUp = () => {
  //   const id = setInterval(() => setY((prev) => prev + 1), 1);
  //   setIntervalId(id);
  // };
  // useEffect(() => {
  //   if (y === 200) {
  //     clearInterval(intervalId);
  //   }
  // }, [y, intervalId]);
  // console.log('rendering');

  // const Y = new Animated.Value(0);

  // const [up, setUp] = useState(false);
  // const Y_POSITION = useRef(new Animated.Value(300)).current;
  // const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
  // const toggleUp = () => setUp((prev) => !prev);

  // const POSITION = useRef(
  //   new Animated.ValueXY({
  //     // x: -SCREEN_WIDTH / 2 + 100,
  //     // y: -SCREEN_HEIGHT / 2 + 100,
  //     x: 0,
  //     y: 0,
  //   })
  // ).current;

  // const topLeft = Animated.timing(POSITION, {
  //   toValue: {
  //     x: -SCREEN_WIDTH / 2 + 100,
  //     y: -SCREEN_HEIGHT / 2 + 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const bottomLeft = Animated.timing(POSITION, {
  //   toValue: {
  //     x: -SCREEN_WIDTH / 2 + 100,
  //     y: SCREEN_HEIGHT / 2 - 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const bottomRight = Animated.timing(POSITION, {
  //   toValue: {
  //     x: SCREEN_WIDTH / 2 - 100,
  //     y: SCREEN_HEIGHT / 2 - 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const topRight = Animated.timing(POSITION, {
  //   toValue: {
  //     x: SCREEN_WIDTH / 2 - 100,
  //     y: -SCREEN_HEIGHT / 2 + 100,
  //   },
  //   useNativeDriver: false,
  // });

  // const moveUp = () => {
  //   // Animated.timing(POSITION, {
  //   //   toValue: up ? 300 : -300,
  //   //   useNativeDriver: false,
  //   //   // easing: Easing.circle,
  //   //   duration: 1000,
  //   // }).start(toggleUp);
  //   Animated.loop(
  //     Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
  //   ).start();
  // };

  // const rotation = POSITION.y.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: ['-360deg', '360deg'],
  // });

  // const borderRadius = POSITION.y.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: [100, 0],
  // });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // true로 설정하면 어떤 터치 event든 감지하겠다는 뜻
      // onPanResponderGrant: () => {
      //   // 움직임이 시작될때 호출
      //   console.log('Touch Started');
      //   POSITION.setOffset({
      //     // 전에 있던 값을 저장,
      //     x: POSITION.x._value, // 숫자를 가지고 옴, 그냥 x만 적으면 Animated Value만 가지고 옴
      //     y: POSITION.y._value, // 숫자를 가지고 옴
      //   });
      // },
      // onPanResponderMove: (_, { dx, dy }) => {
      //   POSITION.setValue({
      //     // 애니메이션을 수동으로 설정
      //     x: dx, // offset을 지정했기 때문에 이전 값에 더해 주는 방식으로 작동
      //     y: dy,
      //   });
      // },
      onPanResponderMove: (_, { dx }) => {
        // console.log(dx);
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn().start(),
      onPanResponderRelease: (_, { dx }) => {
        // 손을 떼면 동작
        // Animated.spring(POSITION, {
        //   toValue: {
        //     x: 0,
        //     y: 0,
        //   },
        //   bounciness: 20,
        //   useNativeDriver: false,
        // }).start();

        // console.log('Touch Finished');
        // POSITION.flattenOffset(); // offset을 0으로 만들어줌

        // Animated.parallel([
        //   onPressOut,
        //   Animated.spring(position, {
        //     toValue: 0,
        //     useNativeDriver: true,
        //   }),
        // ]).start();
        if (dx < -250) {
          // goLeft.start();
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          // goRight.start();
          goLeft.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  // State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    setIndex((prev) => prev + 1);
    position.setValue(0);
    // Animated.timing(position, { toValue: 0, useNativeDriver: true }).start();
  };

  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };

  // const opacity = Y_POSITION.interpolate({
  //   inputRange: [-300, 0, 300],
  //   outputRange: [1, 0.5, 1],
  // });
  // const borderRadius = Y_POSITION.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: [100, 0],
  // });
  // Y_POSITION.addListener(() => {
  //   console.log('Y VALUE:', Y_POSITION);
  //   console.log('opacity VALUE:', opacity);
  //   console.log('borderRadius VALUE:', borderRadius);
  // });

  // const bgColor = POSITION.y.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
  // });

  return (
    <Container>
      {/* <Pressable onPress={moveUp}>
        <AnimatedBox
          onPress={moveUp}
          style={{
            // opacity,
            borderRadius,
            backgroundColor: bgColor,
            // transform: [{ translateY: Y_POSITION }],
            // transform: [{ rotateY: rotation }, { translateY: POSITION.y }],
            transform: [...POSITION.getTranslateTransform()],
          }}
        />
      </Pressable> */}
      {/* <AnimatedBox */}
      <CardContainer>
        <Card style={{ transform: [{ scale: secondScale }] }}>
          <Ionicons name={icons[index + 1]} color='#192a56' size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            // borderRadius,
            // backgroundColor: bgColor,
            // transform: [...POSITION.getTranslateTransform()],
            transform: [
              { scale },
              { translateX: position },
              { rotateZ: rotation },
            ],
          }}
        >
          <Ionicons name={icons[index]} color='#192a56' size={98} />
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name='close-circle' color='white' size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name='checkmark-circle' color='white' size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
}
