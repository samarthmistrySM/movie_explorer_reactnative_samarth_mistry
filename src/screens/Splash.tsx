import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring
} from 'react-native-reanimated';

const Splash = () => {
  const opacity = useSharedValue(0); 
  const scale = useSharedValue(0.8); 
  const translateY = useSharedValue(100);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1500 });
    scale.value = withSpring(1, { damping: 8 });
    translateY.value = withTiming(0, { duration: 1500 });
  }, [opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={styles.splashContainer} testID='Splash'>
      <Animated.Text style={[styles.logoText, animatedStyle]}>
        Movie <Text style={styles.highlight}>Explorer+</Text>
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  highlight: {
    color: '#FFFFFF',
  },
});

export default Splash;