import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types.ts';
import genreList from '../mock/genres.json';
import {Movie} from '../Types.ts';
import SearchSuggestionBox from '../components/SearchSuggestionBox.tsx';
import {searchMovies} from '../api/movieApi.ts';

const {width, height} = Dimensions.get('window');

const Search = () => {
  const recentSearches = [
    'Captain',
    'Action',
    'Best Action Movie',
    'Oscar Winners 2024',
  ];
  const inputRef = useRef<TextInput>(null);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const handleSearch = () => {
    if (searchText.length > 0) {
      if (!searchHistory.includes(searchText)) {
        setSearchHistory([...searchHistory, searchText]);
      }
      navigation.navigate('Result', {
        filter: {query: searchText, type: 'title'},
      });
    }
  };

  const handleDeleteSearchHistory = (index: number) => {
    setSearchHistory(prevHistory => prevHistory.filter((_, i) => i !== index));
  };

  const handleSelect = (movie: Movie) => {
    setShowSuggestions(false);
    if (!searchHistory.includes(movie.title)) {
      setSearchHistory([...searchHistory, movie.title]);
    }
    navigation.navigate('MovieDetails', {
      movie,
    });
    setSearchText('');
  };

  const fetchMovies = async (query:string) => {
    try {
      const res = await searchMovies(query);
      if (res) {
        setShowSuggestions(true);
        setSuggestions(res.movies);
      }
    } catch (error) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (!searchText) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const timeout = setTimeout(() => {
      fetchMovies(searchText);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchText]);

  const handlePressClear = () => {
    setSearchText('');
    setSuggestions([]);
    inputRef.current?.blur();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Search</Text>
        <View style={styles.headerRight}>
          <Image
            style={styles.castIcon}
            source={require('../assets/airplay.video.png')}
          />
          <Image
            style={styles.userProfile}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg',
            }}
          />
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/magnifyingglass.png')}
            style={styles.icon}
          />
          <TextInput
            placeholder="Search title or genre"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
            onSubmitEditing={handleSearch}
            ref={inputRef}
          />
          {showSuggestions && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={handlePressClear}>
              <Image
                source={require('../assets/multiply.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <SearchSuggestionBox
        suggestions={showSuggestions ? suggestions : []}
        onSelect={handleSelect}
      />
      <ScrollView>
        <View style={styles.genreContainer}>
          {(isCollapsed ? genreList.slice(0, 5) : genreList).map(
            (genre, index) => (
              <TouchableOpacity
                key={index}
                style={styles.genreBtn}
                onPress={() => {
                  navigation.navigate('Result', {
                    filter: {query: genre.name, type: 'genre'},
                  });
                }}>
                <ImageBackground
                  source={{uri: genre.bg}}
                  resizeMode="cover"
                  style={styles.genreBackground}
                  imageStyle={{borderRadius: 10}}>
                  <View style={styles.overlay}>
                    <Text style={styles.genreText}>{genre.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ),
          )}

          <TouchableOpacity
            style={styles.showMoreBtn}
            onPress={() => setIsCollapsed(!isCollapsed)}>
            <Text style={styles.showMoreText}>
              Show {isCollapsed ? 'more' : 'less'}
            </Text>
            <Image
              source={
                isCollapsed
                  ? require('../assets/chevron.down.png')
                  : require('../assets/chevron.up.png')
              }
              style={[
                styles.icon,
                {width: width * 0.035, height: width * 0.035},
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.sectionHeading}>Recent Searches</Text>
          {searchHistory.map((search, index) => (
            <View key={index} style={styles.recentSearchBtn}>
              <TouchableOpacity
                style={styles.recentSearchesLeft}
                onPress={() =>
                  navigation.navigate('Result', {
                    filter: {query: search, type: 'title'},
                  })
                }>
                <Image
                  style={styles.icon}
                  source={require('../assets/clock.arrow.trianglehead.counterclockwise.rotate.90.png')}
                />
                <Text style={styles.searchText}>{search}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={`del-btn-${search}`}
                onPress={() => handleDeleteSearchHistory(index)}>
                <Image
                  style={[
                    styles.icon,
                    {width: width * 0.035, height: width * 0.035},
                  ]}
                  source={require('../assets/multiply.png')}
                />
              </TouchableOpacity>
            </View>
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
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  heading: {
    fontSize: width * 0.055,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  castIcon: {
    height: width * 0.06,
    width: width * 0.06,
    tintColor: '#DDD',
    resizeMode: 'contain',
    marginRight: 20,
  },
  userProfile: {
    height: width * 0.09,
    width: width * 0.09,
    borderRadius: height * 0.08,
  },
  inputWrapper: {
    paddingHorizontal: 10,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 10,
  },
  icon: {
    height: width * 0.05,
    width: width * 0.05,
    tintColor: '#FF3B30',
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  genreBtn: {
    width: '48%',
    height: width * 0.15,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  genreBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  showMoreBtn: {
    backgroundColor: '#1C1C1E',
    width: '48%',
    height: width * 0.15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  showMoreText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentSearchesContainer: {
    paddingHorizontal: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  recentSearchBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderColor: '#9CA3AF',
    paddingVertical: 10,
  },
  recentSearchesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  clearBtn: {
    position: 'absolute',
    right: 5,
  },
  crossIcon: {
    height: width * 0.035,
    width: width * 0.035,
    tintColor: '#FF3B30',
    resizeMode: 'contain',
    marginRight: 10,
  },
});

export default Search;
