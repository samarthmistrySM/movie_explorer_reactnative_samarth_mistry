import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UserDetails from '../components/UserDetails.tsx';
import MovieCard from '../components/MovieCard';
import {Movie} from '../Types.ts';
import {getMovies} from '../api/movieApi';
const {height} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import MovieCardLoading from '../components/MovieCardLoading.tsx';

const Home = () => {
  const labels = ['Top Rated', 'Latest by year'];
  const [selectedLabel, setSelectedLabel] = useState<string>('Top Rated');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getMovies(1, 10);
      setMovies(res.movies as Movie[]);
    } catch (error) {
      Toast.show('Error fetching movie', Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const moviesCopy = [...movies];
    const filterMovies = () => {
      if (selectedLabel === 'Top Rated') {
        return moviesCopy.sort((a, b) => b.rating - a.rating);
      } else if (selectedLabel === 'Latest by year') {
        return moviesCopy.sort((a, b) => b.release_year - a.release_year);
      }
      return moviesCopy;
    };
    setFilteredMovies(filterMovies());
  }, [selectedLabel, movies]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <UserDetails />
        <ImageBackground
          source={require('../assets/bg2.png')}
          resizeMode="cover"
          style={styles.backgroundContainer}>
          <View style={styles.overlay}>
            <View>
              <Text style={styles.movieTitle}>Dune: Part Two</Text>
              <View style={styles.movieDetails}>
                <Text style={styles.badge}>New</Text>
                <Text style={styles.text}>2024</Text>
                <Text style={styles.text}>2h 26m</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.labelContainer}>
          {labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              testID={`label-${index}`}
              style={[
                styles.labelBtn,
                selectedLabel === label && styles.activeLabel,
              ]}
              onPress={() => {
                setSelectedLabel(label);
              }}>
              <Text style={styles.labelBtnText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}>
          {loading
            ? Array.from({length: 6}).map((_, idx) => (
                <MovieCardLoading key={idx} />
              ))
            : filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
        </ScrollView>
        <View>
          <Text style={styles.sectionHeading}>Trending Now</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}>
            {loading
              ? Array.from({length: 6}).map((_, index) => (
                  <MovieCardLoading key={index} />
                ))
              : movies.map(
                  movie =>
                    movie.id % 2 === 0 && (
                      <MovieCard key={movie.id} movie={movie} />
                    ),
                )}
          </ScrollView>
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
  backgroundContainer: {
    position: 'relative',
    width: '100%',
    height: height * 0.26,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 15,
  },
  movieTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FF3B30',
    fontWeight: 600,
    color: '#FFF',
    marginRight: 10,
    fontSize: 16,
    borderRadius: 4,
  },
  text: {
    color: '#FFF',
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: 400,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  labelBtn: {
    backgroundColor: '#1C1C1E',
    padding: 8,
    borderRadius: 20,
  },
  labelBtnText: {
    color: '#FFF',
    fontSize: 16,
  },
  activeLabel: {
    backgroundColor: '#FF3B30',
  },
  cardsContainer: {
    paddingHorizontal: 10,
    gap: 10,
    marginVertical: 10,
  },
  sectionHeading: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Home;
