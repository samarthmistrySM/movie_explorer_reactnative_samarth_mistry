import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types.ts';
import MovieCard from '../components/MovieCard.tsx';
import {Movie} from '../Types.ts';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {filterMovies} from '../api/movieApi';
import AuthContext from '../context/AuthContext.tsx';
import MovieCardLoading from '../components/MovieCardLoading.tsx';
import {useWatchList} from '../context/WatchListContext.tsx';

const {width, height} = Dimensions.get('window');

const MovieDetails = () => {
  const router = useRoute();
  const {movie}: {movie: Movie} | any = router.params;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {subscription, loggedUser} = useContext(AuthContext);
  const {watchlist, addMovieToWatchList, removeMovieFromWatchList} =
    useWatchList();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await filterMovies(movie.genre);
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

  const isInWatchlist = watchlist.some((m: Movie) => m.title === movie.title);

  const handleToggleWatchList = async () => {
    try {
      const action = isInWatchlist
        ? removeMovieFromWatchList
        : addMovieToWatchList;
      const verb = isInWatchlist ? 'removed from' : 'added to';
      const success = await action(movie.id);
      if (!success) throw new Error();
      Toast.show(`${movie.title} ${verb} watchlist`, Toast.LONG);
    } catch {
      Toast.show(`Error ${isInWatchlist ? 'removing' : 'adding'}`, Toast.LONG);
    }
  };

  if (
    movie.premium &&
    subscription !== 'premium' &&
    loggedUser.role !== 'supervisor'
  ) {
    return (
      <SafeAreaView style={styles.lockedContainer}>
        <View style={styles.lockedContent}>
          <Image
            source={require('../assets/lock.fill.png')}
            style={styles.lockIcon}
          />
          <Text style={styles.lockedTitle}>Premium Content</Text>
          <Text style={styles.lockedText}>
            This movie is available only for premium users.
          </Text>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.bg}
          source={{uri: movie.banner_url}}
          resizeMode={'cover'}>
          <LinearGradient
            colors={['rgba(0,0,0,0.24)', '#000000B2', '#000']}
            style={styles.linearGradient}
          />
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.icon}
              source={require('../assets/chevron.left.png')}
            />
          </TouchableOpacity>
          <View>
            <View style={styles.badgesContainer}>
              <Text style={styles.badge}>{movie.genre}</Text>
              <Text style={styles.text}>{movie.streaming_platform}</Text>
            </View>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.ratingContainer}>
              <Image
                style={styles.star}
                source={require('../assets/star.fill.png')}
              />
              <Text style={styles.rating}>{movie.rating}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.bodyHeading}>Synopsis</Text>
            <Text style={styles.text}>{movie.description}</Text>
          </View>
          <View style={styles.moreDetailsContainer}>
            <View style={styles.moreDetail}>
              <View style={styles.moreDetailHeader}>
                <Image
                  style={[styles.icon, styles.moreDetailIcon]}
                  source={require('../assets/calendar.png')}
                />
                <Text style={styles.label}>Release Date</Text>
              </View>
              <Text style={styles.boldText}>{movie.release_year}</Text>
            </View>
            <View style={styles.moreDetail}>
              <View style={styles.moreDetailHeader}>
                <Image
                  style={[styles.icon, styles.moreDetailIcon]}
                  source={require('../assets/clock.png')}
                />
                <Text style={styles.label}>Duration</Text>
              </View>
              <Text style={styles.boldText}>{movie.duration} min</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.watchListBtn}
            disabled={loggedUser.role === 'supervisor'}
            onPress={handleToggleWatchList}>
            <Text style={styles.watchListBtnText}>
              {loggedUser.role !== 'supervisor'
                ? isInWatchlist
                  ? 'Remove from watchlist'
                  : 'Add to Watchlist'
                : 'Supervisor Account'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.secondaryTitle}>More like this</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}>
            {loading
              ? Array.from({length: 6}).map((_, index) => (
                  <MovieCardLoading key={index} />
                ))
              : movies.map(m => <MovieCard key={m.id} movie={m} />)}
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
    paddingBottom: 20,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  icon: {
    height: width * 0.045,
    width: width * 0.045,
    tintColor: '#FFF',
    resizeMode: 'contain',
  },
  bg: {
    position: 'relative',
    width: '100%',
    height: height * 0.45,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  goBack: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.42)',
    borderRadius: 30,
    margin: 10,
  },
  watchListBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 11,
  },
  watchListBtnText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  badge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
    color: '#FFF',
    marginRight: 10,
  },
  text: {
    color: '#FFF',
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 800,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  star: {
    height: width * 0.04,
    width: width * 0.04,
    tintColor: '#FACC15',
    resizeMode: 'contain',
    marginRight: 5,
  },
  rating: {
    color: '#FACC15',
  },
  body: {
    padding: 10,
  },
  bodyHeading: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  moreDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moreDetail: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    width: '48%',
    borderRadius: 10,
  },
  moreDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  moreDetailIcon: {
    tintColor: '#FF3B30',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#a8a8a8',
  },
  boldText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 600,
  },
  secondaryTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  cardsContainer: {
    paddingHorizontal: 10,
    gap: 10,
  },
  lockedContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lockedContent: {
    alignItems: 'center',
  },
  lockIcon: {
    width: 80,
    height: 80,
    tintColor: '#FF3B30',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  lockedTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lockedText: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 30,
  },
  goBackButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  goBackText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.65,
    // backgroundColor: 'red'
  },
});

export default MovieDetails;
