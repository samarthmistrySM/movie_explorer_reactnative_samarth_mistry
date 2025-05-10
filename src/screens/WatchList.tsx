import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import {Movie} from '../Types';
import {getMovies} from '../api/movieApi';
import Toast from 'react-native-simple-toast';

const {width} = Dimensions.get('window');

const WatchList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await getMovies(page, 10);
        setMovies(res.movies as Movie[]);
      } catch (error) {
        Toast.show('Error fetching movies', Toast.LONG);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroller}>
        <View style={styles.header}>
          <Text style={styles.heading}>Explore</Text>
        </View>
        {loading ? (
          <View style={styles.alertContainer}>
            <ActivityIndicator size="large" color="#FF3B30" />
          </View>
        ) : movies?.length === 0 ? (
          <View style={styles.alertContainer}>
            <Image
              source={require('../assets/magnifyingglass.png')}
              style={styles.alertIcon}
            />
            <Text style={styles.heading}>No result found</Text>
          </View>
        ) : (
          <View style={styles.moviesContainer}>
            {movies?.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </View>
        )}
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
  scroller: {
    flexGrow: 1,
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
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
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIcon: {
    height: width * 0.2,
    width: width * 0.2,
    tintColor: 'rgba(176, 176, 176, 1)',
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default WatchList;
