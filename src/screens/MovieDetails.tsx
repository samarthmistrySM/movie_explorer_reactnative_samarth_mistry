import React, {useEffect, useState} from 'react';
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
import moviesData from '../mock/movies.json';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const MovieDetails = () => {
  const router = useRoute();
  const {movie}: any = router.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const filteredMovies = moviesData.filter(m => m.genre === movie.genre);
    setAllMovies(filteredMovies);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.bg}
          source={{uri: movie.thumbnail}}
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
              <Text style={styles.text}>{movie.category}</Text>
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
            <Text style={styles.text}>
              wo imprisoned men bond over a number of years, finding solace and
              eventual redemption through acts of common decency.
            </Text>
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
              <Text style={styles.boldText}>{movie.releaseDate}</Text>
            </View>
            <View style={styles.moreDetail}>
              <View style={styles.moreDetailHeader}>
                <Image
                  style={[styles.icon, styles.moreDetailIcon]}
                  source={require('../assets/clock.png')}
                />
                <Text style={styles.label}>Duration</Text>
              </View>
              <Text style={styles.boldText}>{movie.duration}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.secondaryTitle}>More like this</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}>
            {allMovies.map(m => (
              <MovieCard key={m.id} movie={m} />
            ))}
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
    height: height * 0.4,
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
});

export default MovieDetails;
