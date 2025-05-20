import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import { Movie } from '../Types';
import { getMovies } from '../api/movieApi';
import MovieCardLoading from '../components/MovieCardLoading';

const { width } = Dimensions.get('window');

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
      
      if (newMovies.length < 10) {
        setHasMore(false);
        setMovies(prev => [...prev, ...newMovies]);
        return;

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
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const renderMovie = ({ item, index }: { item: Movie; index: number }) => (
    <View style={styles.movieItem}>
      <MovieCard key={index} movie={item} />
    </View>
  );

  const renderLoadMoreButton = () => {
    if (loading) {
      return <FlatList
          data={Array.from({length: 6})}
          keyExtractor={(_, idx) => `loading-${idx}`}
          renderItem={() => <MovieCardLoading />}
          numColumns={2}
          contentContainerStyle={styles.moviesContainer}
          columnWrapperStyle={styles.columnWrapper}
        />;
    }
    if (hasMore) {
      return (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.moviesContainer}
          columnWrapperStyle={styles.columnWrapper}
          ListFooterComponent={renderLoadMoreButton}
        />
      )}
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
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 10,
  },
  movieItem: {
    width: (width - 40) / 2,
    marginBottom:15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    paddingHorizontal: 15,
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
  loader: {
    marginVertical: 20,
  },
  loadMoreButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 20,
  },
  loadMoreText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Explore;