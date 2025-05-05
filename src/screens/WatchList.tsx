import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import MoviesContext from '../context/MoviesContext';

const {width} = Dimensions.get('window');

const WatchList = () => {
  const {movies} = useContext(MoviesContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.heading}>My Watchlist</Text>
        </View>
        <View style={styles.moviesContainer}>
          {movies.map((movie, index) => (
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
    paddingTop: 20,
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

export default WatchList;
