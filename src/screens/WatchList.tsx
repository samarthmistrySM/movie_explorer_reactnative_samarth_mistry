import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import WatchListCard from '../components/WatchListCard';
const {width} = Dimensions.get('window');
import {MainStackParams} from '../navigation/Types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useWatchList} from '../context/WatchListContext';

const WatchList = () => {
  const {watchlist,removeMovieFromWatchList} = useWatchList();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParams>>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}>
          <Image
            style={styles.icon}
            source={require('../assets/chevron.left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>My Watchlist</Text>
        <View style={{width: 32}} />
      </View>
      {watchlist.length === 0 ? (
        <Text style={styles.emptyText}>Your watchlist is empty.</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <WatchListCard movie={item} onRemove={removeMovieFromWatchList}/>}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </SafeAreaView>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingTop: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (width * 0.09) / 2, 
    backgroundColor: 'rgba(255,59,48,0.07)',
    marginRight: 10,
  },
  icon: {
    height: width * 0.045,
    width: width * 0.045,
    tintColor: '#FF3B30',
    resizeMode: 'contain',
  },
  header: {
    color: '#FF3B30',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    letterSpacing: 1,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.7,
  },
});
