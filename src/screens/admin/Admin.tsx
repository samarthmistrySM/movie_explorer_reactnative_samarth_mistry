import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import ContentItem from '../../components/ContentItem';
import {Movie} from '../../Types';
import {getMovies} from '../../api/movieApi';
import AddModal from '../../components/AddModal';
import EditModal from '../../components/EditModal';
const {width, height} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';

const Admin = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [reload, setReload] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  

useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getMovies(page, 5);
      const fetchedMovies = res.movies as Movie[];
      const totalPagesFetched = res.pagination.total_pages;

      if (fetchedMovies.length === 0 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        setMovies(fetchedMovies);
        setTotalPages(totalPagesFetched);
      }
    } catch (error) {
      Toast.show('Error fetching movie', Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, [page, reload]);


  const update = () => {
    setReload(!reload);
  }

  const incrementPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    } else {
      Toast.show('No more pages available!', Toast.LONG);
    }
  };

  const decrementPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      Toast.show('No more pages available!', Toast.LONG);
    }
  };

  const handleModalClose = () => {
    setIsEditModalVisible(false);
    setIsAddModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Supervisor Control</Text>
          <TouchableOpacity style={styles.adminButton}>
            <Text style={styles.adminButtonText}>Supervisor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <View style={styles.iconPlaceholder} />
            <Text style={styles.statsTitle}>Total Users</Text>
            <Text style={styles.statsValue}>1.2M</Text>
          </View>
          <View style={styles.statsCard}>
            <View style={styles.iconPlaceholder} />
            <Text style={styles.statsTitle}>Active Subs</Text>
            <Text style={styles.statsValue}>12.8K</Text>
          </View>
          <View style={styles.statsCard}>
            <View style={styles.iconPlaceholder} />
            <Text style={styles.statsTitle}>Revenue</Text>
            <Text style={styles.statsValue}>158.2K</Text>
          </View>
          <View style={styles.statsCard}>
            <View style={styles.iconPlaceholder} />
            <Text style={styles.statsTitle}>Content</Text>
            <Text style={styles.statsValue}>1.2K</Text>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentHeaderTitle}>Recent Content</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
              <Text style={styles.addButtonText}>+ Add Movie</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentBody}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#FF3B30"
                style={{alignSelf: 'center', marginTop: 20}}
              />
            ) : (
              movies.map((movie, index) => (
                <ContentItem
                  key={index}
                  movie={movie}
                  setIsEditModalVisible={setIsEditModalVisible}
                  setSelectedMovie={setSelectedMovie}
                  update={update}
                />
              ))
            )}
          </View>

          <View style={styles.pagination}>
            <TouchableOpacity onPress={decrementPage} disabled={page === 1}>
              <Image
                style={styles.icon}
                source={require('../../assets/chevron.left.png')}
              />
            </TouchableOpacity>
            <Text style={styles.paginationText}>Page {page} / {totalPages}</Text>
            <TouchableOpacity onPress={incrementPage} disabled={page === 9}>
              <Image
                style={styles.icon}
                source={require('../../assets/chevron.right.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AddModal
        isModalOpen={isAddModalVisible}
        handleModalClose={handleModalClose}
        update={update}
      />
      <EditModal
        isModalOpen={isEditModalVisible}
        handleModalClose={handleModalClose}
        movie={selectedMovie}
        update={update}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  adminButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF3B30',
  },
  statsCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
  },
  statsTitle: {
    color: '#6E7681',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  statsValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentSection: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FF3B30',
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  contentBody: {
    minHeight: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: width * 0.045,
    width: width * 0.045,
    tintColor: '#FF3B30',
    resizeMode: 'contain',
    marginRight: 10,
  },
  paginationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Admin;
