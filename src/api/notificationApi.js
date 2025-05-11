import api from "./apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateDeviceToken = async (fcmToken) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/api/v1/update_device_token', {
            device_token : fcmToken,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}