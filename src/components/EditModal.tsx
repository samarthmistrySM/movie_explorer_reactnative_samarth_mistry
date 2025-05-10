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
  Alert,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import { updateMovie } from '../api/adminApi';
import { styles } from './AddModal';
import { Movie } from '../Types';
import Toast from 'react-native-simple-toast';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
  movie: Movie | null;
  update: () => void;
}

const EditModal: FC<Props> = ({isModalOpen, handleModalClose, movie, update}) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [mainLead, setMainLead] = useState('');
  const [streamingPlatform, setStreamingPlatform] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setGenre(movie.genre);
      setReleaseYear(movie.release_year.toString());
      setRating(movie.rating.toString());
      setDirector(movie.director);
      setDuration(movie.duration.toString());
      setDescription(movie.description);
      setMainLead(movie.main_lead);
      setStreamingPlatform(movie.streaming_platform);
    }
  },[movie])

  const handleSubmit = async () => {
      const updatedMovie = {
        id: movie?.id,
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
        await updateMovie(updatedMovie); 
  
        Toast.show('Movie updated successfully!', Toast.LONG);
        update();
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
        console.log('Error editing movie:', error.response);
        Toast.show('Error updating movie!', Toast.LONG);
      }
    };
  return (
      <Modal visible={isModalOpen} animationType="slide" transparent onRequestClose={handleModalClose}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>Update Movies</Text>
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
                    <Text style={styles.submitButtonText}>Update Movie</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    );
};

export default EditModal;