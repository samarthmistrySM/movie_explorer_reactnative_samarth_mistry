import React, {FC} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../Types';
import {MainStackParams} from '../navigation/Types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

interface Props {
  movie: Movie;
  onRemove: (id: number) => Promise<boolean>;
}

const WatchListCard: FC<Props> = ({movie, onRemove}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const handleRemove = async () => {
    const res = await onRemove(movie.id);

    if (res) {
      Toast.show(`${movie.title} removed from watchlist`, Toast.LONG);
    } else {
      Toast.show(`Error removing`, Toast.LONG);
    }
  };
  return (
    <View style={styles.card}>
      <Image source={{uri: movie.poster_url}} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.row}>
          <Text style={styles.meta}>
            {movie.release_year} • {movie.genre}
          </Text>
          {/* <Text style={styles.rating}> {movie.rating.toFixed(1)}</Text> */}
        </View>
        <Text style={styles.duration}>{movie.duration} min</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('MovieDetails', {movie})}>
          <Text style={styles.btnText}>See more</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={handleRemove}>
        <Image
          source={require('../assets/multiply.png')}
          style={styles.trashIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WatchListCard;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#232323',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 10,
    alignItems: 'center',
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#181818',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  meta: {
    color: '#bbb',
    fontSize: 14,
    marginRight: 10,
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  duration: {
    color: '#bbb',
    fontSize: 13,
    marginBottom: 2,
  },
  removeBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 0,
    marginTop: 4,
    right: 5,
    top: 5,
  },
  trashIcon: {
    width: 10,
    height: 10,
    tintColor: '#FF3B30',
    marginRight: 6,
    resizeMode: 'contain',
  },
  removeText: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
  },
});
