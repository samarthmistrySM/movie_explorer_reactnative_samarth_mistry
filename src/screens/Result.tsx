import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import movieData from '../mock/movies.json';
import MovieCard from '../components/MovieCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SearchStackParams} from '../navigation/Types.ts';
import {Movie} from '../Types';

const {width} = Dimensions.get('window');

const Result = () => {
  const {params} = useRoute();
  const {filter}: any = params;
  const navigation =
    useNavigation<NativeStackNavigationProp<SearchStackParams>>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const filteredMovieData = movieData.filter(
      movie =>
        movie.genre.toLowerCase() === filter.toLowerCase() ||
        movie.title.toLowerCase().includes(filter.toLowerCase()) ||
        movie.genre.toLowerCase().includes(filter.toLowerCase()),
    );
    setFilteredMovies(filteredMovieData);
  }, [movieData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.icon}
              source={require('../assets/chevron.left.png')}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Search results for {filter}</Text>
        </View>
        <View style={styles.moviesContainer}>
          {filteredMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: {
    height: width * 0.045,
    width: width * 0.045,
    tintColor: '#FF3B30',
    resizeMode: 'contain',
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Result;
