import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from '../navigation/Types';
import { handleSuccessfulPayment } from '../api/paymentApi';

const Payment = () => {
  
  const {params} = useRoute();
  
  const {url, session_id}: {url: string; session_id: string} | any = params;

  const navigation =
          useNavigation<NativeStackNavigationProp<MainStackParams>>();

  const handleNavigationChange = async (navState:any) => {
    try {
      if(navState.url.includes('success')){
        const res = await handleSuccessfulPayment(session_id);
        if(res.status === 200){
          navigation.replace("Success")
        }
      }
    } catch (error:any) {
      console.log("Error getting success", error.response); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: url}}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationChange}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
