import React, {FC, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {addMovie} from '../api/adminApi';
import Toast from 'react-native-simple-toast';
import {launchImageLibrary} from 'react-native-image-picker';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
  update: () => void;
}

const AddModal: FC<Props> = ({isModalOpen, handleModalClose, update}) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [mainLead, setMainLead] = useState('');
  const [posterImage, setPosterImage] = useState<any>(null);
  const [bannerImage, setBannerImage] = useState<any>(null);

  const handlePickPoster = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPosterImage(response.assets[0]);
      }
    });
  };

  const handlePickBanner = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setBannerImage(response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !genre.trim() ||
      !releaseYear.trim() ||
      !rating.trim() ||
      !director.trim() ||
      !duration.trim() ||
      !description.trim()
    ) {
      Alert.alert(
        'Information Missing!',
        'Please fill in all the required fields.',
      );
      return;
    }

    if (
      isNaN(Number(releaseYear)) ||
      isNaN(Number(rating)) ||
      isNaN(Number(duration))
    ) {
      Alert.alert(
        'Validation Error',
        'Release Year, Rating, and Duration must be numbers.',
      );
      return;
    }

    if (Number(rating) > 10) {
      Alert.alert('Validation Error', 'Rating must be between 1 to 10.');
      return;
    }

    const formData = new FormData();

    formData.append('movie[title]', title);
    formData.append('movie[genre]', genre);
    formData.append('movie[release_year]', releaseYear);
    formData.append('movie[rating]', rating);
    formData.append('movie[director]', director);
    formData.append('movie[duration]', parseInt(duration, 10));
    formData.append('movie[description]', description);
    formData.append('movie[main_lead]', mainLead);

    if (posterImage) {
      formData.append('movie[poster]', {
        uri: posterImage.uri,
        name: posterImage.fileName || 'poster.jpg',
        type: posterImage.type,
      });
    }

    if (bannerImage) {
      formData.append('movie[banner]', {
        uri: bannerImage.uri,
        type: bannerImage.type,
        name: bannerImage.fileName || 'banner.jpg',
      });
    }

    try {
      await addMovie(formData);
      update();

      Toast.show('Movie Added!', Toast.LONG);
      setTitle('');
      setGenre('');
      setReleaseYear('');
      setRating('');
      setDirector('');
      setDuration('');
      setDescription('');
      setMainLead('');
      setPosterImage(null);
      setBannerImage(null);
      handleModalClose();
    } catch (error: any) {
      console.log('Caught Error:', error?.response ?? error);
      Toast.show('Failed to add movie!', Toast.LONG);
      update();
    }
  };

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent
      onRequestClose={handleModalClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Add New Movie</Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Title <Text style={styles.require}> * require</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter movie title"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Genre <Text style={styles.require}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={genre}
                  onChangeText={setGenre}
                  placeholder="Genre (e.g. Action, Drama)"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Release Year <Text style={styles.require}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={releaseYear}
                  onChangeText={setReleaseYear}
                  placeholder="Enter release year"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Rating <Text style={styles.require}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={rating}
                  onChangeText={setRating}
                  placeholder="Enter rating (1-10)"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Director <Text style={styles.require}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={director}
                  onChangeText={setDirector}
                  placeholder="Enter director name"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Duration <Text style={styles.require}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={duration}
                  onChangeText={setDuration}
                  placeholder="Duration in minutes"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Main Lead <Text style={styles.require}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={mainLead}
                  onChangeText={setMainLead}
                  placeholder="Enter main actor/actress"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Description <Text style={styles.require}> *</Text>
                </Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Movie description"
                  placeholderTextColor="#999"
                  multiline
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Poster </Text>
                <TouchableOpacity
                  style={styles.imagePickerButton}
                  onPress={handlePickPoster}>
                  {posterImage ? (
                    <Image
                      source={{uri: posterImage.uri}}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Text style={styles.placeholderText}>
                        Pick Poster Image
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Banner</Text>
                <TouchableOpacity
                  style={styles.imagePickerButton}
                  onPress={handlePickBanner}>
                  {bannerImage ? (
                    <Image
                      source={{uri: bannerImage.uri}}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Text style={styles.placeholderText}>
                        Pick Banner Image
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleModalClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Add Movie</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddModal;

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  modalContent: {
    backgroundColor: '#121212',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  closeButton: {
    fontSize: 22,
    color: '#999',
    padding: 4,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    padding: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  require: {
    color: '#FF0000',
    marginHorizontal: 20,
    fontSize: 15,
  },
});
