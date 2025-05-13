import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import {Movie} from '../Types';
import {getMovies} from '../api/movieApi';

const {width} = Dimensions.get('window');

const Explore = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await getMovies(pageNum, 10);
      const newMovies = res.movies as Movie[];
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
    console.log(movies);
    
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Explore</Text>

        {movies.length === 0 && !loading ? (
          <View style={styles.alertContainer}>
            <Image
              source={require('../assets/magnifyingglass.png')}
              style={styles.alertIcon}
            />
            <Text style={styles.heading}>No result found</Text>
          </View>
        ) : (
          <View style={styles.moviesGrid}>
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </View>
        )}

        {loading && (
          <ActivityIndicator size="large" color="#FF3B30" style={styles.loader} />
        )}

        {hasMore && !loading && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  alertContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  alertIcon: {
    height: width * 0.2,
    width: width * 0.2,
    tintColor: 'rgba(176, 176, 176, 1)',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  loadMoreButton: {
    // backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  loadMoreText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Explore;
