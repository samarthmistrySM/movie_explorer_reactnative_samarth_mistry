import React, {useState} from 'react';
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

const {width, height} = Dimensions.get('window');

const Search = () => {
  const genreList = [
    {
      name: 'Action',
      bg: 'https://wallpapers.com/images/hd/action-background-fh6fxnnqkgq3pn7l.jpg',
    },
    {
      name: 'Adventure',
      bg: 'https://img.freepik.com/free-vector/adventure-background_23-2149036143.jpg',
    },
    {
      name: 'Fantasy',
      bg: 'https://media.istockphoto.com/id/688410346/vector/chinese-style-fantasy-scenes.jpg?s=612x612&w=0&k=20&c=r3skS5InspYQ7EqUCCzUzU3QHcwRwD6mNRbDpP8sIG4=',
    },
    {
      name: 'Thriller',
      bg: 'https://img.freepik.com/free-photo/orange-grunge-texture_1048-3123.jpg',
    },
    {
      name: 'Drama',
      bg: 'https://static.vecteezy.com/system/resources/thumbnails/014/000/181/small/red-stage-curtain-illuminated-by-spotlights-illustration-vector.jpg',
    },
    {
      name: 'Sci-Fi',
      bg: 'https://static.vecteezy.com/system/resources/thumbnails/001/966/689/small/abstract-futuristic-background-technology-sci-fi-concept-vector.jpg',
    },
    {
      name: 'Mystery',
      bg: 'https://png.pngtree.com/thumb_back/fh260/background/20230328/pngtree-castle-game-scene-mysterious-fantasy-background-image_2117946.jpg',
    },
    {
      name: 'Comedy',
      bg: 'https://media.istockphoto.com/id/1361889847/vector/american-comic-concentration-line.jpg?s=612x612&w=0&k=20&c=Wzz4YpSXmOWs-nQqm17_WVZenvK4uVAms-Ec5_3_Ajg=',
    },
    {
      name: 'Horror',
      bg: 'https://media.istockphoto.com/id/1492685467/vector/halloween-grave-background.jpg?s=612x612&w=0&k=20&c=ug0HfzbIn0K-07SBZObweUcf2TYxCf6LkMuXLwy4bhI=',
    },
  ];

  const recentSearches = [
    'Captain',
    'Action',
    'Best Action Movie',
    'Oscar Winners 2024',
  ];

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const handelSearch = () => {
    if(searchText.length > 0) {
      if (!searchHistory.includes(searchText)) {
        setSearchHistory([...searchHistory, searchText]);
      }
      navigation.navigate('Result',{filter: searchText});
    }
  };

  const handleDeleteSearchHistory = (index: number) => {
    setSearchHistory(prevHistory => prevHistory.filter((_, i) => i !== index));
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
              uri: 'https://lh3.googleusercontent.com/a/ACg8ocKQblDIwzPa7ztlKWSLGTNu-rxU2bV5gv_nnDAxN8rcuvnN_g=s576-c-no',
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
            onSubmitEditing={() => handelSearch()}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.genreContainer}>
          {(isCollapsed ? genreList.slice(0, 5) : genreList).map(
            (genre, index) => (
              <TouchableOpacity
                key={index}
                style={styles.genreBtn}
                onPress={() => {
                  navigation.navigate('Result', {filter: genre.name});
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
                onPress={() => navigation.navigate('Result', {filter: search})}>
                <Image
                  style={styles.icon}
                  source={require('../assets/clock.arrow.trianglehead.counterclockwise.rotate.90.png')}
                />
                <Text style={styles.searchText}>{search}</Text>
              </TouchableOpacity>
              <TouchableOpacity testID={`del-btn-${search}`} onPress={() => handleDeleteSearchHistory(index)}>
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
    paddingTop: 20,
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
});

export default Search;
