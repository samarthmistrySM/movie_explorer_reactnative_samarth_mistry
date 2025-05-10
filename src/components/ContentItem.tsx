import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {Movie} from '../Types';
import {deleteMovie} from '../api/adminApi';
const {width, height} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';

interface Props {
  movie: Movie;
  setIsEditModalVisible: (isVisible: boolean) => void;
  setSelectedMovie: (movie: Movie) => void;
  update: () => void;
}

const ContentItem: FC<Props> = ({
  movie,
  setIsEditModalVisible,
  setSelectedMovie,
  update,
}) => {
  const handleDelete = async () => {
    try {
      await deleteMovie(movie.id);
      Toast.show('Movie deleted successfully!', Toast.LONG);
      update();
    } catch (error: any) {
      console.log('Error deleting movie:', error.response);
      Toast.show('error deleting movie!', Toast.LONG);
    }
  };
  return (
    <View style={styles.contentItem}>
      <Image
        testID="movie-poster"
        source={{uri: movie.poster_url}}
        style={styles.contentImage}
      />
      <View style={styles.contentInfo}>
        <Text style={styles.contentTitle}>{movie.title}</Text>
      </View>
      <View style={styles.contentActions}>
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityRole="button"
          onPress={() => {
            setIsEditModalVisible(true);
            setSelectedMovie(movie);
          }}>
          <Image
            source={require('../assets/pencil.png')}
            style={styles.editIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.actionButton}
          onPress={() => {
            handleDelete();
          }}>
          <Image
            source={require('../assets/trash.fill.png')}
            style={styles.binIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContentItem;

const styles = StyleSheet.create({
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  contentImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  contentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contentTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  contentStatus: {
    fontSize: 14,
  },
  activeStatus: {
    color: '#32D74B',
  },
  processingStatus: {
    color: '#FF9500',
  },
  draftStatus: {
    color: '#6E7681',
  },
  contentActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  actionIcon: {
    color: '#6E7681',
    fontSize: 16,
  },
  editIcon: {
    height: width * 0.04,
    width: width * 0.04,
    tintColor: 'rgb(27, 0, 228)',
    resizeMode: 'contain',
    marginRight: 10,
  },
  binIcon: {
    height: width * 0.04,
    width: width * 0.04,
    tintColor: 'rgb(255, 0, 0)',
    resizeMode: 'contain',
    marginRight: 10,
  },
});
