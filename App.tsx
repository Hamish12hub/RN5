import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import IntroScreen from './components/Game';
const { height, width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./photos/backgroundSky.jpg')} style={styles.backgroundSky} ></Image>
      <Image source={require('./photos/backgroundGrass.jpg')} style={styles.backgroundGrass}></Image>
      <IntroScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGrass: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.1,
    zIndex: -1,
  },
  backgroundSky: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.9,
    zIndex: -1,
  },
});
