import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {filterMovies, searchMovies} from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types.ts';
import {Movie} from '../Types';
import MovieCardLoading from '../components/MovieCardLoading.tsx';

const {width} = Dimensions.get('window');

type Filter = {
  type: 'title' | 'genre';
  query: string;
};

const Result = () => {
  const {params} = useRoute();
  const {filter}: {filter: Filter} | any = params;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      let res;
      setLoading(true);
      if (filter.type === 'title') {
        res = await searchMovies(filter.query);
      } else if (filter.type === 'genre') {
        res = await filterMovies(filter.query);
      }
      if (res) {
        setMovies(res.movies);
      }
    } catch (error: any) {
      // console.log('Error fetching movies:', error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderItem = ({item, index}: {item: Movie; index: number}) => (
    <View style={styles.movieItem}>
      <MovieCard key={index} movie={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        testID="goBackBtn"
        style={styles.header}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          source={require('../assets/chevron.left.png')}
        />
        <Text style={styles.heading}>
          Search results for {`"${filter.query}"`}
        </Text>
      </TouchableOpacity>
      {loading ? (
        <FlatList
          data={Array.from({length: 6})}
          keyExtractor={(_, idx) => `loading-${idx}`}
          renderItem={() => <MovieCardLoading />}
          numColumns={2}
          contentContainerStyle={styles.moviesContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : movies?.length === 0 ? (
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
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.moviesContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 30,
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
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 10,
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

export default Result;
