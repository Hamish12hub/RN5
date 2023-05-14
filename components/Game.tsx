

import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
  Text
} from 'react-native';
import { GestureEventType } from './types';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const Game = () => {
  const [rotationDegree, setRotationDegree] = useState(0);
  const [previousDegree, setPreviousDegree] = useState(0);

  const handleGesture = (event: GestureEventType) => {
    const { translationX } = event.nativeEvent;
    const maxRotation = 50;
    const newDegree = previousDegree + translationX / (width * 0.2) * maxRotation;
    const boundedDegree = Math.min(Math.max(newDegree, -maxRotation), maxRotation);
    setRotationDegree(boundedDegree);
  };
  const roundedDegree = rotationDegree + 50;
  
  const handleGestureStateChange = (event: GestureEventType) => {
    if (event.nativeEvent.state === State.END) {
      setPreviousDegree(rotationDegree);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.CharacterOutside}>
        <View style={styles.CharacterPanel}>
          <Animated.View 
            style={[styles.Character, { 
              top: `${(roundedDegree/100)*85}%`,
              transform: [{translateY: new Animated.Value(0).interpolate({
                inputRange: [-50, 50],
                outputRange: [200, -200],
                extrapolate: 'clamp'
              })}]
            }]}
          >
            <Text>{roundedDegree}</Text>
          </Animated.View>
        </View>
      </View>
      <View style={styles.maxHeight}>
        <View style={styles.OutsideWheel}>
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleGestureStateChange}
          >
            <Animated.View
              style={[
                styles.centeredView,
                {
                  transform: [
                    { rotate: `${rotationDegree}deg` },
                    { perspective: 1000 },
                  ],
                },
              ]}
            >
              <View style={styles.square}>
                <Image source={require('./carr.jpg')} style={styles.image} />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </View>
  );
};







const styles = StyleSheet.create({
  fullScreen: {
    width: width,
    height: height,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  maxHeight: {
    maxHeight: width,
    width: width,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  OutsideWheel:{
    backgroundColor: "green",
    width: width,
    aspectRatio: 1,
    alignItems: "center",
  },
  centeredView: {
    top: width * 0.05,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: 'red',
    borderRadius: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    backgroundColor: 'white',
    width: width * 0.4,
    height: width * 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  CharacterOutside: {
    backgroundColor: "yellow",
    width: width,
    height: height * 0.8,
  },
  CharacterPanel:{
    left: width * 0.1,
    height: height * 0.6,
    backgroundColor: "red",
    width: width * 0.2,
    top: height * 0.2,
  },
  Character:{
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: "blue",
  }

});

export default Game;