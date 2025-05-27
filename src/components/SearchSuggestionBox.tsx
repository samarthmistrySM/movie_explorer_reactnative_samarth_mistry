import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { FC } from 'react';
import { Movie } from '../Types';

interface Props {
    suggestions: Movie[],
    onSelect: (movie:Movie)=> void;
}

const SearchSuggestionBox:FC<Props> = ({ suggestions, onSelect }) => {
  if (!suggestions?.length) return null;
  return (
  <View style={styles.absoluteBox}>
    <FlatList
      data={suggestions}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <Text style={styles.suggestion}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
  );
};

export default SearchSuggestionBox;

const styles = StyleSheet.create({
  absoluteBox: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    maxHeight: 200,
    zIndex: 100,
  },
  suggestion: {
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  }
});  