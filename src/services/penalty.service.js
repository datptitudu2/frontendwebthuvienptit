import axios from 'axios';

const API_URL = 'https://khongbugptit.onrender.com/api/penalties';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token ? { 
    'Authorization': `Bearer ${user.token}`,
    'Content-Type': 'application/json'
  } : {};
};

const getUserPenalties = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const penaltyService = {
  getUserPenalties
};

export default penaltyService; 