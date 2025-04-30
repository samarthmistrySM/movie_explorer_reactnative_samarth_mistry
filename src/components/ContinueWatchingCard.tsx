import React, {FC} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Movie} from '../Types.ts';
const {width} = Dimensions.get('window');

interface Props {
  movie: Movie;
}

const MovieCard: FC<Props> = ({movie}) => {
  return (
    <View style={styles.card}>
      <ImageBackground source={{uri: movie.thumbnail}} style={styles.thumbnail}>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.playBtn}>
            <Image
              style={styles.icon}
              source={require('../assets/play.fill.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {movie.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.448,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#000',
  },
  thumbnail: {
    width: '100%',
    height: width * 0.55,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  playBtn: {
    backgroundColor: '#FFFFFF84',
    padding: 20,
    borderRadius: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default MovieCard;
