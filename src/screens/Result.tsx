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
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {filterMovies, searchMovies} from '../api/movieApi.js';
import MovieCard from '../components/MovieCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types.ts';
import {Movie} from '../Types';

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

  useEffect(() => {
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
        console.log('Error fetching movies:', error.response);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroller}>
        <View style={styles.header}>
          <TouchableOpacity
            testID="goBackBtn"
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.icon}
              source={require('../assets/chevron.left.png')}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>
            Search results for {`"${filter.query}"`}
          </Text>
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

export default Result;
