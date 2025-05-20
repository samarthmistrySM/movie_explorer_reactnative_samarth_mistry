import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Animated, Easing} from 'react-native';

const {width} = Dimensions.get('window');

const MovieCardLoading = () => {
  const ShineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(ShineAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
    ).start();
  }, [ShineAnim]);

  const ShineTranslate = ShineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 240],
  });

  const Shine = ({style}: {style: any}) => (
    <View style={[style, {overflow: 'hidden'}]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{translateX: ShineTranslate}],
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            width: 120,
            height: '100%',
            borderRadius: style.borderRadius || 4,
            opacity: 0.7,
          },
        ]}
      />
    </View>
  );

  return (
    <View style={styles.card} testID="movie-card-loading">
      <View style={styles.thumbnail}>
        <Shine style={styles.thumbnail} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.title}>
          <Shine style={styles.title} />
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.ratingRow}>
            <View style={styles.star}>
              <Shine style={styles.star} />
            </View>
            <View style={styles.text}>
              <Shine style={styles.text} />
            </View>
          </View>
          <View style={styles.genre}>
            <Shine style={styles.genre} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.44,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#1C1C1E',
    marginBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: width * 0.55,
    backgroundColor: '#333',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    position: 'relative',
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    width: '100%',
    height: 18,
    borderRadius: 4,
    backgroundColor: '#333',
    marginBottom: 8,
    overflow: 'hidden',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#333',
    marginRight: 6,
    overflow: 'hidden',
  },
  text: {
    width: 24,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#333',
    overflow: 'hidden',
  },
  genre: {
    width: 42,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#333',
    overflow: 'hidden',
  },
});

export default MovieCardLoading;
