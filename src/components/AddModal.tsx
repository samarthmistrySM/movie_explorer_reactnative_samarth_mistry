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

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const AddModal: FC<Props> = ({isModalOpen, handleModalClose}) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [mainLead, setMainLead] = useState('');
  const [streamingPlatform, setStreamingPlatform] = useState('');


  const handleSubmit = async () => {
    const movie = {
      title,
      genre,
      release_year: releaseYear,
      rating,
      director,
      duration,
      description,
      main_lead: mainLead,
      streaming_platform: streamingPlatform,
    }
  
    try {
      await addMovie(movie); 

      Toast.show('Movie Added!', Toast.LONG);
      setTitle('');
      setGenre('');
      setReleaseYear('');
      setRating('');
      setDirector('');
      setDuration('');
      setDescription('');
      setMainLead('');
      setStreamingPlatform('');
      handleModalClose();
    } catch (error: any) {
      console.log('Error adding movie:', error.response);
      Toast.show('Failed to add movie!', Toast.LONG, {
        tapToDismissEnabled: true,
        textColor: '#000000',
        backgroundColor: '#FF3B30',
      });
    }
  };

  return (
    <Modal visible={isModalOpen} animationType="slide" transparent onRequestClose={handleModalClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Add New Movie</Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter movie title" placeholderTextColor="#999" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Genre</Text>
                <TextInput style={styles.input} value={genre} onChangeText={setGenre} placeholder="Genre (e.g. Action, Drama)" placeholderTextColor="#999" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Release Year</Text>
                <TextInput style={styles.input} value={releaseYear} onChangeText={setReleaseYear} placeholder="Enter release year" placeholderTextColor="#999" keyboardType="numeric" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Rating</Text>
                <TextInput style={styles.input} value={rating} onChangeText={setRating} placeholder="Enter rating (1-10)" placeholderTextColor="#999" keyboardType="numeric" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Director</Text>
                <TextInput style={styles.input} value={director} onChangeText={setDirector} placeholder="Enter director name" placeholderTextColor="#999" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Duration</Text>
                <TextInput style={styles.input} value={duration} onChangeText={setDuration} placeholder="Duration in minutes" placeholderTextColor="#999" keyboardType="numeric" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Main Lead</Text>
                <TextInput style={styles.input} value={mainLead} onChangeText={setMainLead} placeholder="Enter main actor/actress" placeholderTextColor="#999" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Streaming Platform</Text>
                <TextInput style={styles.input} value={streamingPlatform} onChangeText={setStreamingPlatform} placeholder="Where to watch" placeholderTextColor="#999" />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Movie description"
                  placeholderTextColor="#999"
                  multiline
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleModalClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
});
