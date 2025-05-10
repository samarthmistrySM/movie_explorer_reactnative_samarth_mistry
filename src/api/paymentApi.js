import axios from 'axios';
const baseUrl = 'https://teststripeapi.vercel.app';

export const getClientSecret = async (email, priceId) => {
  try {
    const response = await axios.post(`${baseUrl}/create-subscription`, {
        email,
        priceId,
      });

      return response.data.clientSecret;
  } catch (error) {
    console.log('Error fetching client secret', error.response);
    throw new Error('Error fetching client secret: ', error.response);
  }
};
