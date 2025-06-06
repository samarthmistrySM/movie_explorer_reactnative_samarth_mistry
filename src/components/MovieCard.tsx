import React, {FC} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Movie} from '../Types.ts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types.ts';
const {width} = Dimensions.get('window');

interface Props {
  movie: Movie;
}

const MovieCard: FC<Props> = ({movie}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParams>
    >();
  return (
    <TouchableOpacity
      testID='movie-card-btn'
      onPress={() => navigation.navigate('MovieDetails', {movie: movie})}>
      <View style={styles.card}>
        <ImageBackground source={{uri: movie.poster_url}} style={styles.thumbnail} >
          {movie.premium && <Text style={styles.premiumBadge}>P</Text>}
        </ImageBackground>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {movie.title}
          </Text>

          <View style={styles.detailsRow}>
            <View style={styles.ratingRow}>
              <Image
                style={styles.star}
                source={require('../assets/star.fill.png')}
              />
              <Text style={styles.text}>{movie.rating}</Text>
            </View>
            <Text style={styles.genre}>{movie.genre}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.44,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#1C1C1E',
  },
  thumbnail: {
    width: '100%',
    height: width * 0.55,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
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
    marginRight: 4,
    tintColor: '#ddd',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  genre: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  premiumBadge:{
    paddingHorizontal:7,
    paddingVertical:2,
    color: '#FFF',
    backgroundColor: '#FF3B30',
    borderRadius: 20,
  }
});

export default MovieCard;
